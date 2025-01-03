// Simulate running inside Discord by overriding the navigator.userAgent for development
if (import.meta.env.MODE === "development") {
  Object.defineProperty(navigator, "userAgent", {
    value: "Discord",
    writable: true,
  });
  console.log("Modified userAgent for development:", navigator.userAgent);
}

import { DiscordSDK } from "@discord/embedded-app-sdk";
import "./style.css";

// Extract query parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
let frameId = urlParams.get("frame_id");
let instanceId = urlParams.get("instance_id");
let platform = urlParams.get("platform");

// Simulate missing query parameters for local development
if (import.meta.env.MODE === "development") {
  if (!frameId) {
    frameId = "test";
    console.log("Simulated frame_id for development:", frameId);
  }
  if (!instanceId) {
    instanceId = "12345";
    console.log("Simulated instance_id for development:", instanceId);
  }
  if (!platform || (platform !== "desktop" && platform !== "mobile")) {
    platform = "desktop"; // Default to desktop
    console.log("Simulated platform for development:", platform);
  }
}

console.log("frame_id from URL:", frameId);
console.log("instance_id from URL:", instanceId);
console.log("platform from URL:", platform);

// Initialize the Discord SDK
let discordSdk;
try {
  console.log("Initializing Discord SDK...");
  discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID, {
    frame_id: frameId,
    instance_id: instanceId,
    platform: platform,
  });
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
  discordSdk
    .ready()
    .then(() => {
      console.log("Discord SDK is ready");

      // Render the UI
      document.querySelector("#app").innerHTML = `
        <div>
          <h1>Discord Activity</h1>
          <p>SDK Ready. Client ID: ${import.meta.env.VITE_DISCORD_CLIENT_ID}</p>
          <p>Frame ID: ${frameId}</p>
          <p>Instance ID: ${instanceId}</p>
          <p>Platform: ${platform}</p>
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
