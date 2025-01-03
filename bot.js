const { Client, GatewayIntentBits } = require('discord.js');

const BOT_TOKEN = import.meta.env.Planify_BOT_TOKEN;
const CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID; // Replace with your application's Client ID

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'startactivity') {
    try {
      // Create an activity invite
      const invite = await interaction.channel.createInvite({
        targetApplication: CLIENT_ID, // Your application's Client ID
        targetType: 2, // Type 2 is for Activities
      });

      // Manually append the parameters to the invite URL
      const fullInviteUrl = `${invite.url}?target_application=${CLIENT_ID}&target_type=2`;

      console.log('Activity invite created:', fullInviteUrl);

      // Reply with the full invite link
      await interaction.reply(`Click this link to start the activity: ${fullInviteUrl}`);
    } catch (error) {
      console.error("Error creating activity invite:", error);
      await interaction.reply("Failed to create activity invite.");
    }
  }
});

// Login to Discord
client.login(BOT_TOKEN);
