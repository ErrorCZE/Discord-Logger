const { getSettings } = require("./getSettings") // getSettings(server, type)
const client = require('..');
const { EmbedBuilder, ApplicationCommandType } = require('discord.js');

async function sendInfo(server, actionType, data) {
	let channel = client.channels.cache.get(await getSettings(server, actionType));
	if (!channel) return;

	if (actionType === "messageUpdate") {
		const embed = new EmbedBuilder()
			.setColor("#009dff")
			.setTitle("**Message edited**")
			.setAuthor({ name: `${data.user.globalName}`, iconURL: `https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}.webp` })
			.setDescription(`Message edited in <#${data.channelId}>\n[Go To Message](https://discord.com/channels/${data.serverId}/${data.channelId}/${data.messageId})`)
			.addFields([
				{ name: 'Old content', value: data.oldContent },
				{ name: 'New content', value: data.newContent },
				{ name: 'IDs', value: "```ini\n" + `User = ${data.user.id}\nChannel = ${data.channelId}\nMessage = ${data.messageId}` + "```" }
			])
			.setTimestamp()

		channel.send({ embeds: [embed] })
	} else if (actionType === "messageDelete") {
		const embed = new EmbedBuilder()
			.setColor("#009dff")
			.setTitle("**Message Deleted**")
			.setAuthor({ name: `${data.user.globalName}`, iconURL: `https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}.webp` })
			.setDescription(`Message deleted in <#${data.channelId}>`)
			.addFields([
				{ name: 'Content', value: data.content },
				{ name: 'IDs', value: "```ini\n" + `User = ${data.user.id}\nChannel = ${data.channelId}\nMessage = ${data.messageId}` + "```" }
			])
			.setTimestamp()

		channel.send({ embeds: [embed] })
	}

}

module.exports = {
	sendInfo,
};