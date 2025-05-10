import express from "express";
import bodyParser from "body-parser";
import pkg from "@prisma/client";
import bcrypt from "bcrypt";
import cors from "cors";

const { PrismaClient } = pkg;
const app = express();
const port = 8080;
app.use(bodyParser.json());
const prisma = new PrismaClient();

app.get("/login", async (req, res) => {
  const { email, password } = req.query;

  // check if the input fields are missing
  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({ message: "Required field is missing" });
  }

  // try to fetch the user from the database
  try {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    // check if user exist
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check if the password entered is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Authentication failed",
      });
    }

    console.log(user);
    // return the user details of the fetched user
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
  // check if the username is already taken
  try {
    const userExists = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (userExists) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // if username is available create new user
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        name: body.username,
        email: body.email,
        password: hashedPassword,
      },
    });

    console.log("New User : ", user);
    // return the status that the user is created successfully
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
  console.log(`Server running on http://localhost:8080`);
});
