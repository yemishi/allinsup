import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";

const router = express();
import Stripe from "stripe";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

router.post("/checkout", async (req: any, res) => {
  const { line_items, method } = req.body;
  const token = jwt.sign({ method }, process.env.JWT_SECRET as string, { expiresIn: "5m" });
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: [method],
      line_items,
      mode: "payment",
      success_url: `${process.env.APP_URL}/checkout?session_id={CHECKOUT_SESSION_ID}&token=${token}`,
      cancel_url: `${process.env.APP_URL}/checkout?session_id={CHECKOUT_SESSION_ID}&token=${token}`,
    });
    res.json({ id: session.id });
  } catch (error) {
    console.log(error);
    return res.json({
      error: true,
      message: "We had a problem in an attempt to make a purchase.",
    });
  }
});

router.get("/confirm-payment", async (req, res) => {
  const sessionId = req.query.session_id;
  const token = req.query.token as string;
  if (!sessionId || !token) return res.status(400).json({ success: false, message: "Missing queries", error: true });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { method: string; exp: number };
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ success: false, message: "session expired" });
    }
    const session = await stripe.checkout.sessions.retrieve(sessionId as string);

    if (session.payment_status === "paid") {
      res.json({
        success: true,
        message: "Payment successful",
        paymentStatus: session.payment_status,
        method: decoded.method as string,
      });
    } else {
      res.json({ success: false, message: "Payment not successful", paymentStatus: session.payment_status });
    }
  } catch (error: any) {
    console.error("Error confirming payment:", error);
    res.json({ success: false, message: error.message });
  }
});

export default router;
