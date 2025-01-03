import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const port = 3001;

app.use(express.json());

// Debug server start
console.log("Starting server...");

// Handle GET /
app.get("/", (req, res) => {
  res.send("Server is running. Use POST /api/token to get a Discord token.");
});

// Handle POST /api/token
app.post("/api/token", async (req, res) => {
  try {
    console.log("Received token request with code:", req.body.code);

    const response = await fetch(`https://discord.com/api/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.VITE_DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code: req.body.code,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Discord API Error:", errorText);
      return res.status(response.status).send({ error: errorText });
    }

    const { access_token } = await response.json();
    console.log("Access token retrieved:", access_token);

    res.send({ access_token });
  } catch (error) {
    console.error("Error in /api/token:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
