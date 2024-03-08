const { getSettings } = require("./getSettings") // getSettings(server, type)
const client = require('..');
const { EmbedBuilder, ApplicationCommandType } = require('discord.js');

async function sendInfo(server, actionType, data) {
	let channel = client.channels.cache.get(await getSettings(server, actionType));
	if (!channel) return console.log("neni channel");

	if (actionType === "messageUpdate") {
		const embed = new EmbedBuilder()
			.setColor("#009dff")
			.setTitle("**Message Edit**")
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
			.setTitle("**Message Delete**")
			.setAuthor({ name: `${data.user.globalName}`, iconURL: `https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}.webp` })
			.setDescription(`Message deleted in <#${data.channelId}>`)
			.addFields([
				{ name: 'Content', value: data.content },
				{ name: 'IDs', value: "```ini\n" + `User = ${data.user.id}\nChannel = ${data.channelId}\nMessage = ${data.messageId}` + "```" }
			])
			.setTimestamp()

		channel.send({ embeds: [embed] })
	} else if (actionType === 'voiceChannelJoin') {
		const embed = new EmbedBuilder()
			.setColor("#009dff")
			.setTitle("**Channel Join**")
			.setAuthor({ name: `${data.user.globalName}`, iconURL: `https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}.webp` })
			.setDescription(`Joined channel <#${data.channelId}>`)
			.addFields([
				{ name: 'IDs', value: "```ini\n" + `User = ${data.user.id}\nChannel = ${data.channelId}` + "```" }
			])
			.setTimestamp()

		channel.send({ embeds: [embed] })
	} else if (actionType === 'voiceChannelLeave') {
		const embed = new EmbedBuilder()
			.setColor("#009dff")
			.setTitle("**Channel Leave**")
			.setAuthor({ name: `${data.user.globalName}`, iconURL: `https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}.webp` })
			.setDescription(`Left channel <#${data.channelId}>`)
			.addFields([
				{ name: 'IDs', value: "```ini\n" + `User = ${data.user.id}\nChannel = ${data.channelId}` + "```" }
			])
			.setTimestamp()

		channel.send({ embeds: [embed] })
	} else if (actionType === 'voiceChannelSwitch') {
		const embed = new EmbedBuilder()
			.setColor("#009dff")
			.setTitle("**Channel Switch**")
			.setAuthor({ name: `${data.user.globalName}`, iconURL: `https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}.webp` })
			.setDescription(`From <#${data.oldChannelId}> To <#${data.newChannelId}>`)
			.addFields([
				{ name: 'IDs', value: "```ini\n" + `User = ${data.user.id}\nOldChannel = ${data.oldChannelId}\nNewChannel = ${data.newChannelId}` + "```" }
			])
			.setTimestamp()

		channel.send({ embeds: [embed] })
	}

}

module.exports = {
	sendInfo,
};