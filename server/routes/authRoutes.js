import express from "express";
import { OAuth2Client } from "google-auth-library";

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    // verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // here you can store or check user in your database
    const user = { email, name, picture };

    // console.log("✅ Google User:", user);
    console.log("✅ payload User:", payload);

    // return user data to frontend
    res.json({ user });
  } catch (err) {
    console.error("Google login failed:", err);
    res.status(401).json({ message: "Invalid Google token" });
  }
});

export default router;
