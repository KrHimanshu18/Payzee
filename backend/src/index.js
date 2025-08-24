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

app.post("/setWalletAddress", async (req, res) => {
  const { email, walletAddress } = req.body;

  if (!email || !walletAddress) {
    return res
      .status(400)
      .json({ message: "Email and wallet address required" });
  }

  try {
    // Find the user
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if account details already exist
    const accountExists = await prisma.accountDetails.findUnique({
      where: { userId: user.id },
    });

    let account;
    if (accountExists) {
      // Update existing account
      account = await prisma.accountDetails.update({
        where: { userId: user.id },
        data: { walletAddress },
      });
    } else {
      // Create new account details
      account = await prisma.accountDetails.create({
        data: {
          walletAddress,
          userId: user.id,
        },
      });
    }

    res
      .status(200)
      .json({ message: "Wallet added/updated successfully", account });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to add wallet", error: error.message });
  }
});

app.post("/updateWalletAddress", async (req, res) => {
  const { email, walletAddress } = req.body;

  if (!email || !walletAddress) {
    return res
      .status(400)
      .json({ message: "Email and wallet address required" });
  }

  try {
    // Find the user
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update existing account
    const account = await prisma.accountDetails.update({
      where: { userId: user.id },
      data: { walletAddress },
    });

    res
      .status(200)
      .json({ message: "Wallet address updated successfully", account });
  } catch (error) {
    console.error(error);
    // Handle case if accountDetails does not exist
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ message: "Account details not found for this user" });
    }
    res
      .status(500)
      .json({ message: "Failed to update wallet", error: error.message });
  }
});

async function getChainBalances(address) {
  const chains = [1, 42161, 8453, 10, 137];
  const apiKey = process.env.BALANCE_KEY;
  let balances = {};

  for (const chain of chains) {
    try {
      const url = `https://api.etherscan.io/v2/api?chainid=${chain}&module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;
      console.log(`\n=== Fetching balance for chain ${chain} ===`);
      console.log("URL:", url);

      const response = await axios.get(url).then((res) => res.data);
      console.log("Full balance response:", JSON.stringify(response, null, 2));

      balances[chain] = response?.result
        ? ethers.formatEther(response.result)
        : "0";
    } catch (err) {
      console.error(`Error fetching balance for chain ${chain}:`, err.message);
      balances[chain] = "error";
    }
  }

  return balances;
}

// export async function getTokens(address) {
//   const chains = [1, 42161, 8453, 10, 137]; // Ethereum, Arbitrum, Base, Optimism, Polygon
//   const apiKey = process.env._MULTICHAINAPI_KEY;
//   let allTokens = {};

//   for (const chain of chains) {
//     try {
//       console.log(`\n=== Fetching token transactions for chain ${chain} ===`);

//       const url = `https://api.etherscan.io/v2/api?chainid=${chain}&module=account&action=tokentx&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;
//       console.log("URL:", url);

//       const resp = await axios.get(url);
//       const data = resp.data;
//       console.log("Full token tx response:", JSON.stringify(data, null, 2));

//       if (!Array.isArray(data?.result)) {
//         allTokens[chain] = {};
//         continue;
//       }

//       const tokens = {};

//       for (const tx of data.result) {
//         if (!tx?.tokenSymbol || !tx?.tokenDecimal) continue;
//         const symbol = tx.tokenSymbol;
//         const value = ethers.BigNumber.from(tx.value);

//         if (!tokens[symbol]) tokens[symbol] = ethers.BigNumber.from(0);

//         if (tx.to?.toLowerCase() === address.toLowerCase()) {
//           tokens[symbol] = tokens[symbol].add(value);
//         }
//         if (tx.from?.toLowerCase() === address.toLowerCase()) {
//           tokens[symbol] = tokens[symbol].sub(value);
//         }
//       }

//       // Convert BigNumbers to human-readable format
//       for (const symbol in tokens) {
//         const decimals = parseInt(
//           data.result.find((t) => t.tokenSymbol === symbol)?.tokenDecimal ||
//             "18"
//         );
//         tokens[symbol] = ethers.formatUnits(tokens[symbol], decimals);
//       }

//       allTokens[chain] = tokens;
//     } catch (err) {
//       console.error(`Error fetching tokens for chain ${chain}:`, err.message);
//       allTokens[chain] = {};
//     }

//     // Small delay to avoid rate limits
//     await new Promise((res) => setTimeout(res, 500));
//   }

//   return allTokens;
// }

export async function getNormalTransactions(
  address,
  chains = [1, 42161, 8453, 10, 137]
) {
  const apiKey = process.env.TRANSACTION_KEY;
  const allTxs = {};

  for (const chain of chains) {
    try {
      console.log(`\n=== Fetching normal transactions for chain ${chain} ===`);
      const url = `https://api.etherscan.io/v2/api?chainid=${chain}&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${apiKey}`;
      console.log("URL:", url);

      const resp = await axios.get(url);
      const data = resp.data;
      console.log("Full API response:", JSON.stringify(data, null, 2));

      if (!Array.isArray(data?.result)) {
        allTxs[chain] = [];
        continue;
      }

      allTxs[chain] = data.result.map((tx) => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        valueETH: ethers.formatEther(tx.value),
        timeStamp: tx.timeStamp,
        gasUsed: tx.gasUsed,
      }));

      console.log(
        `Fetched ${allTxs[chain].length} transactions for chain ${chain}`
      );
    } catch (err) {
      console.error(
        `Error fetching transactions for chain ${chain}:`,
        err.message
      );
      allTxs[chain] = [];
    }

    await new Promise((res) => setTimeout(res, 500));
  }

  return allTxs;
}

// const tokens = [
//   { symbol: "ETH", address: null, decimals: 18 },
//   { symbol: "MATIC", address: null, decimals: 18 },
//   { symbol: "BNB", address: null, decimals: 18 },
//   { symbol: "AVAX", address: null, decimals: 18 },
//   { symbol: "SOL", address: null, decimals: 9 },
//   { symbol: "FTM", address: null, decimals: 18 },
//   {
//     symbol: "USDT",
//     address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
//     decimals: 6,
//   },
//   {
//     symbol: "USDC",
//     address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
//     decimals: 6,
//   },
//   // add more ERC-20 tokens if needed
// ];

// async function getWalletBalances(walletAddress) {
//   const balances = {};

//   for (const token of tokens) {
//     try {
//       if (!token.address) {
//         const balance = await provider.getBalance(walletAddress);
//         balances[token.symbol] = ethers.formatUnits(balance, token.decimals);
//       } else {
//         const contract = new ethers.Contract(
//           token.address,
//           ["function balanceOf(address owner) view returns (uint256)"],
//           provider
//         );
//         const balance = await contract.balanceOf(walletAddress);
//         balances[token.symbol] = ethers.formatUnits(balance, token.decimals);
//       }
//     } catch (err) {
//       console.error(`Error fetching balance for ${token.symbol}:`, err.message);
//       balances[token.symbol] = "error";
//     }
//   }

//   return balances;
// }

app.get("/getWallet", async (req, res) => {
  try {
    const { address } = req.query;
    if (!address)
      return res.status(400).json({ error: "Wallet address required" });

    let normalizedAddress;
    try {
      normalizedAddress = ethers.getAddress(address);
    } catch {
      return res.status(400).json({ error: "Invalid wallet address" });
    }

    const balances = await getChainBalances(normalizedAddress);
    // const tokens = await getWalletBalances(normalizedAddress);
    const lastTransactions = await getNormalTransactions(normalizedAddress);

    res.json({
      walletAddress: normalizedAddress,
      balances,
      // tokens,
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
