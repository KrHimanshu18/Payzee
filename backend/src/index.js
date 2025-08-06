import express from "express";
import bodyParser from "body-parser";
import pkg from "@prisma/client";
import bcrypt from "bcrypt";
import cors from "cors";

const { PrismaClient } = pkg;
const app = express();
const port = 8081;
app.use(bodyParser.json());
app.use(cors());
const prisma = new PrismaClient();

app.get("/login", async (req, res) => {
  const { email, password } = req.query;

  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({ message: "Required field is missing" });
  }

  try {
    const user = await prisma.user.findFirst({
      where: { email },
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
    //   id: "user_123abc", // auto-generated usually
    //   name: "John Doe",
    //   email: "john@example.com",
    //   password: "hashedpassword123",
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
    console.error(error);
    res.status(500).json({
      message: "Failed to create the user",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
