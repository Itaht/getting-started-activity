import { DiscordSDK } from "@discord/embedded-app-sdk";
import "./style.css";

// Log the full URL and extract the frame_id
console.log("Full URL:", window.location.href);

const urlParams = new URLSearchParams(window.location.search);
const frameId = urlParams.get("frame_id");
console.log("frame_id from URL:", frameId);

// Check if the activity is running inside Discord
const isRunningInDiscord = navigator.userAgent.includes("Discord");
console.log("Running in Discord:", isRunningInDiscord);

// Handle missing frame_id or non-Discord environments
if (!isRunningInDiscord) {
  document.querySelector("#app").innerHTML = `
    <div>
      <h1>Error</h1>
      <p>This activity must be launched from Discord.</p>
    </div>
  `;
  throw new Error("Discord SDK cannot initialize outside of Discord.");
}

if (!frameId) {
  document.querySelector("#app").innerHTML = `
    <div>
      <h1>Error</h1>
      <p>frame_id query parameter is missing. Please launch this activity from Discord.</p>
    </div>
  `;
  throw new Error("Discord SDK cannot initialize without frame_id.");
}

// Initialize the Discord SDK
let discordSdk;
try {
  console.log("Initializing Discord SDK...");
  discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);
  console.log("Discord SDK instance created:", discordSdk);
} catch (error) {
  console.error("Failed to initialize Discord SDK:", error);
  document.querySelector("#app").innerHTML = `
    <div>
      <h1>Error</h1>
      <p>Failed to initialize Discord SDK. Check the console for details.</p>
    </div>
  `;
  throw error;
}

// Wait for the Discord SDK to be ready and render the UI
if (discordSdk) {
  discordSdk.ready()
    .then(() => {
      console.log("Discord SDK is ready");

      // Render the UI
      document.querySelector("#app").innerHTML = `
        <div>
          <h1>Discord Activity</h1>
          <p>SDK Ready. Client ID: ${import.meta.env.VITE_DISCORD_CLIENT_ID}</p>
          <p>Frame ID: ${frameId}</p>
        </div>
      `;
    })
    .catch((err) => {
      console.error("Discord SDK initialization failed:", err);
      document.querySelector("#app").innerHTML = `
        <div>
          <h1>Error</h1>
          <p>Discord SDK failed to initialize. Check the console for details.</p>
        </div>
      `;
    });
}
