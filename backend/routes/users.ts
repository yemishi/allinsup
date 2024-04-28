import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { hashSync, compare } from "bcrypt";
import { User, Order } from "../models";
import { authToken } from "../utils/index";
const router = express();

router.get("/", authToken, async (req, res) => {
  try {
    const { email } = req.user;
    if (!email) return res.json({ error: true, message: "User not found" });

    const user = await User.findOne({ email }).select([
      "name",
      "email",
      "address",
      "isAdmin",
    ]);
    if (!user) return res.json({ error: true, message: "User not found" });

    return res.json(user);
  } catch (error) {
    return res.json({
      error: true,
      message: "We had a problem trying to update the user info",
    });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: true, message: "User not found" });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ error: true, message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email, name: user.name },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1m",
      }
    );
    return res.json({ token, message: `Welcome ${user.name}` });
  } catch (error) {}
  return res.json({
    error: true,
    message: "We had a problem trying to get the user info.",
  });
});

router.get("/test", authToken, async (req, res) => {
  try {
    const { email, name } = req.user;

    return res.json({ email, name });
  } catch (error) {
    return res.json({ error: true });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.json({
        error: true,
        message: "Email already being used",
      });
    const hashedPass = hashSync(password, 10);
    await User.create({ email, password: hashedPass, name });

    return res.json({ message: "User created with success" });
  } catch (error) {
    return res.json({
      error: true,
      message: "We had a problem trying to create the user account",
    });
  }
});

router.delete("/delete", authToken, async (req, res) => {
  try {
    const { email, name } = req.user;

    const userData = await User.findOne({ email, name });
    if (!userData) return res.json({ error: true, message: "User not found" });

    await Order.deleteMany({ userId: userData.id });
    await User.deleteOne({ email, name });

    return res.json({ message: "User deleted with success" });
  } catch (error) {
    return res.json({
      error: true,
      message: "We had a problem trying to delete the user account",
    });
  }
});

router.patch("/", authToken, async (req, res) => {
  try {
    const { password, address, name } = req.body;
    const { email } = req.user;

    if (!email) return res.json({ error: true, message: "User not found" });

    const updateData: any = {};

    if (name) updateData.name = name;
    if (address) updateData.address = address;
    if (password) {
      const hashedPass = hashSync(password, 10);
      updateData.password = hashedPass;
    }

    await User.findOneAndUpdate({ email }, updateData);

    return res.json({ message: "User updated successfully" });
  } catch (error) {
    return res.json({
      error: true,
      message: "We had a problem trying to update the user info",
    });
  }
});

router.patch("/upgrade", authToken, async (req, res) => {
  try {
    const { email } = req.user;

    if (!email) return res.json({ error: true, message: "User not found" });
    await User.findOneAndUpdate(
      { email },
      {
        $set: { isAdmin: true },
      }
    );

    return res.json({ message: "User upgraded successfully" });
  } catch (error) {
    return res.json({
      error: true,
      message: "We had a problem trying to upgrade the user info",
    });
  }
});

export default router;
