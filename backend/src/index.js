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

const explorers = {
  1: "https://api.etherscan.io/api", // Ethereum
  8453: "https://api.basescan.org/api", // Base
  42161: "https://api.arbiscan.io/api", // Arbitrum
  10: "https://api-optimistic.etherscan.io/api", // Optimism
  137: "https://api.polygonscan.com/api", // Polygon
};

async function getChainBalances(address) {
  const chains = [42161, 8453, 10, 534352, 81457]; // arbitrum, base, optimism, scroll, blast
  const apiKey = process.env.MULTICHAIN_API_KEY;
  let balances = {};

  for (const chain of chains) {
    try {
      const query = await fetch(
        `https://api.etherscan.io/v2/api?chainid=${chain}&module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`
      );
      const response = await query.json();
      balances[chain] = response?.result
        ? ethers.formatEther(response.result)
        : "0";
    } catch (err) {
      console.error(`Error fetching balance for chain ${chain}:`, err);
      balances[chain] = "error";
    }
  }

  console.log(balances);
  return balances;
}

async function getTokens(address, chainId) {
  const baseUrl = explorers[chainId];
  const key = process.env.MULTICHAIN_API_KEY;
  let tokens = {};

  try {
    const resp = await axios.get(
      `${baseUrl}?module=account&action=tokentx&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${key}`
    );

    if (Array.isArray(resp.data?.result)) {
      for (const tx of resp.data.result) {
        if (!tx?.tokenSymbol || !tx?.tokenDecimal) continue;
        const symbol = tx.tokenSymbol;

        if (!tokens[symbol]) tokens[symbol] = ethers.BigNumber.from(0);

        if (tx.to?.toLowerCase() === address.toLowerCase()) {
          tokens[symbol] = tokens[symbol].add(ethers.BigNumber.from(tx.value));
        }
        if (tx.from?.toLowerCase() === address.toLowerCase()) {
          tokens[symbol] = tokens[symbol].sub(ethers.BigNumber.from(tx.value));
        }
      }

      for (const symbol in tokens) {
        const decimals = parseInt(
          resp.data.result.find((t) => t.tokenSymbol === symbol)
            ?.tokenDecimal || "18"
        );
        tokens[symbol] = ethers.formatUnits(tokens[symbol], decimals);
      }
    }
  } catch (err) {
    console.error(`Error fetching tokens for chain ${chainId}:`, err?.message);
  }

  return tokens;
}

export async function getLastTransactions(address) {
  let allTxs = {};
  const apiKey = process.env.MULTICHAIN_API_KEY;

  for (const [chainId, baseUrl] of Object.entries(explorers)) {
    try {
      const resp = await axios.get(
        `${baseUrl}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${apiKey}`
      );

      allTxs[chainId] = Array.isArray(resp.data?.result)
        ? resp.data.result.map((tx) => ({
            hash: tx.hash,
            from: tx.from,
            to: tx.to,
            valueETH: ethers.formatEther(tx.value),
            timeStamp: tx.timeStamp,
            gasUsed: tx.gasUsed,
          }))
        : [];
    } catch (err) {
      console.error(`Error fetching tx for chain ${chainId}:`, err.message);
      allTxs[chainId] = [];
    }
  }

  return allTxs;
}

// 🔹 Main API
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

    // Fetch everything via reusable functions
    const [balances, tokens, lastTransactions] = await Promise.all([
      getChainBalances(normalizedAddress),
      getTokens(normalizedAddress),
      getLastTransactions(normalizedAddress),
    ]);

    const network = await provider.getNetwork();
    const txCount = await provider.getTransactionCount(normalizedAddress);
    const code = await provider.getCode(normalizedAddress);
    const isContract = code !== "0x";
    const ens = await provider.lookupAddress(normalizedAddress);

    res.json({
      walletAddress: normalizedAddress,
      network: network.name,
      chainId: network.chainId.toString(),
      balances,
      txCount,
      isContract,
      ensName: ens || null,
      tokens,
      lastTransactions,
    });
  } catch (error) {
    console.error("Error fetching details:", error?.response?.data || error);
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
