const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
const moment = require("moment");
const fs = require('fs');
const path = require('path');

module.exports = {
  name: "setup",
  description: "Initial bot setup",
  type: ApplicationCommandType.ChatInput,
  default_member_permissions: 'Administrator',

  run: async (client, interaction) => {
    if (!interaction.guildId) {
      interaction.reply("Commands must be run on the server.")
      return;
    }

    if (!interaction.member.permissions.has("Administrator")) {
      return interaction.reply({ content: "You do not have permission to run this command.", ephemeral: true });
    }

    const serverId = interaction.guild.id;
    const serversFilePath = path.join(__dirname, '..', 'data', 'servers.json');
    const serversData = JSON.parse(fs.readFileSync(serversFilePath));

    // W.I.P.
    // W.I.P.
    // W.I.P.

    //fs.writeFileSync(serversFilePath, JSON.stringify(serversData, null, 2));

    interaction.reply("xxx");
  }
};