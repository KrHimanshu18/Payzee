import express from "express";
import bodyParser from "body-parser";
import pkg from "@prisma/client";
import bcrypt from "bcrypt";
import cors from "cors";
import { ethers } from "ethers";
import dotenv from "dotenv";
import axios from "axios";

const { PrismaClient } = pkg;
const app = express();
const port = 8081;
dotenv.config();
app.use(bodyParser.json());
app.use(cors());
const prisma = new PrismaClient();
const provider = new ethers.JsonRpcProvider(
  "https://base-mainnet.infura.io/v3/0068e2115b70409fa25b4c1684b4657e"
);

app.get("/login", async (req, res) => {
  const { email, password } = req.query;

  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({ message: "Required field is missing" });
  }

  try {
    const user = await prisma.user.findFirst({
      where: { email },
      include: { account: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Authentication failed",
      });
    }

    console.log(user);
    // const user = {
    //   id: "Kr_Himanshu", // auto-generated usually
    //   name: "Himanshu Kumar",
    //   email: "krhimanshu@example.com",
    //   password: "hashedpassword123",
    //   walletAddress: "not provided yet",
    //   account: [
    //     {
    //       id: "acc_001",
    //       accountNumber: "1234567890",
    //       bankName: "Demo Bank",
    //       userId: "user_123abc",
    //     },
    //   ],
    // };

    res.status(200).json({
      message: "Logged in Successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
});

app.post("/signup", async (req, res) => {
  const body = req.body;
  try {
    const userExists = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (userExists) {
      console.log("Email already registered", body.email);
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });

    console.log("New User : ", user);
    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(body.name, body.email, body.password);
    console.error(error);
    res.status(500).json({
      message: "Failed to create the user",
      error: error.message,
    });
  }
});

app.post("/getDetails", async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({ error: "Wallet address required" });
    }

    let normalizedAddress;
    try {
      normalizedAddress = ethers.getAddress(address); // checksum validation
    } catch (err) {
      return res.status(400).json({ error: "Invalid wallet address" });
    }

    const balance = await provider.getBalance(normalizedAddress);
    const network = await provider.getNetwork();

    res.json({
      walletAddress: normalizedAddress,
      balance: ethers.formatEther(balance), // already string
      network: network.name,
      chainId: network.chainId.toString(), // convert BigInt → string
    });
  } catch (error) {
    console.error("Error fetching details:", error);
    res.status(500).json({ error: "Error fetching details" });
  }
});

app.post("/getWallet", async (req, res) => {
  try {
    const { address } = req.body;
    if (!address)
      return res.status(400).json({ error: "Wallet address required" });

    let normalizedAddress;
    try {
      normalizedAddress = ethers.getAddress(address); // checksum
    } catch {
      return res.status(400).json({ error: "Invalid wallet address" });
    }

    // 1️⃣ ETH balance
    const balance = await provider.getBalance(normalizedAddress);

    // 2️⃣ Network info
    const network = await provider.getNetwork();

    // 3️⃣ Nonce (tx count)
    const txCount = await provider.getTransactionCount(normalizedAddress);

    // 4️⃣ Is contract?
    const code = await provider.getCode(normalizedAddress);
    const isContract = code !== "0x";

    // 5️⃣ ENS name
    const ens = await provider.lookupAddress(normalizedAddress);

    // Fetch token transfers from Basescan
    const basescanBase = `https://api.basescan.org/api`;
    const key = process.env.BASESCAN_API_KEY;

    const tokenTxResp = await axios.get(
      `${basescanBase}?module=account&action=tokentx&address=${normalizedAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${key}`
    );

    let tokens = {};

    if (tokenTxResp.data?.result && Array.isArray(tokenTxResp.data.result)) {
      for (const tx of tokenTxResp.data.result) {
        if (!tx || !tx.tokenSymbol || !tx.tokenDecimal) continue; // skip invalid rows

        const symbol = tx.tokenSymbol;
        const decimals = parseInt(tx.tokenDecimal);

        if (!tokens[symbol]) {
          tokens[symbol] = ethers.BigNumber.from(0);
        }

        // Wallet received tokens
        if (tx.to && tx.to.toLowerCase() === normalizedAddress.toLowerCase()) {
          tokens[symbol] = tokens[symbol].add(ethers.BigNumber.from(tx.value));
        }

        // Wallet sent tokens
        if (
          tx.from &&
          tx.from.toLowerCase() === normalizedAddress.toLowerCase()
        ) {
          tokens[symbol] = tokens[symbol].sub(ethers.BigNumber.from(tx.value));
        }
      }

      // Format balances nicely
      for (const symbol in tokens) {
        const decimals = parseInt(
          tokenTxResp.data.result.find((t) => t.tokenSymbol === symbol)
            ?.tokenDecimal || "18"
        );
        tokens[symbol] = ethers.formatUnits(tokens[symbol], decimals);
      }
    }

    // 7️⃣ Last 10 native transactions
    const txResp = await axios.get(
      `${basescanBase}?module=account&action=txlist&address=${normalizedAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${key}`
    );

    const transactions = Array.isArray(txResp.data?.result)
      ? txResp.data.result
      : [];

    res.json({
      walletAddress: normalizedAddress,
      network: network.name,
      chainId: network.chainId.toString(),
      balanceETH: ethers.formatEther(balance),
      txCount,
      isContract,
      ensName: ens || null,
      tokens,
      lastTransactions: transactions.map((tx) => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        valueETH: ethers.formatEther(tx.value),
        timeStamp: tx.timeStamp,
        gasUsed: tx.gasUsed,
      })),
    });
  } catch (error) {
    console.error("Error fetching details:", error);
    res.status(500).json({ error: "Error fetching details" });
  }
});

app.use((err, req, res, next) => {
  res.json({
    msg: "Sorry something is up with our server",
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
