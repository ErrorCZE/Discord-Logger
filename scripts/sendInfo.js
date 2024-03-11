const { getSettings } = require("./getSettings") // getSettings(server, type)
const client = require('..');
const { EmbedBuilder, ApplicationCommandType } = require('discord.js');

let COLOR = {
	blue: "#4287f5",
	red: "#ff1414",
	green: "#34ff14",
	purple: "#7214ff",
	purpleDark: "#2a095c",
	yellow: "#ffd414",
	white: "#ffffff"
}

async function sendInfo(server, actionType, data) {
	let channel = client.channels.cache.get(await getSettings(server, actionType));
	if (!channel) {
		console.log(`No log channel for ${actionType} in server ${server}`);
	}


	if (data.user.id !== "598142542516584479") return; //POTOM SMAZAT

	if (actionType === "messageUpdate") {
		const embed = new EmbedBuilder()
			.setColor(COLOR.yellow)
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
			.setColor(COLOR.red)
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
			.setColor(COLOR.green)
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
			.setColor(COLOR.red)
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
			.setColor(COLOR.blue)
			.setTitle("**Channel Switch**")
			.setAuthor({ name: `${data.user.globalName}`, iconURL: `https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}.webp` })
			.setDescription(`From <#${data.oldChannelId}> To <#${data.newChannelId}>`)
			.addFields([
				{ name: 'IDs', value: "```ini\n" + `User = ${data.user.id}\nOldChannel = ${data.oldChannelId}\nNewChannel = ${data.newChannelId}` + "```" }
			])
			.setTimestamp()

		channel.send({ embeds: [embed] })
	} else if (actionType === 'voiceChannelStreamStart') {
		const embed = new EmbedBuilder()
			.setColor(COLOR.purple)
			.setTitle("**User Stream Start**")
			.setAuthor({ name: `${data.user.globalName}`, iconURL: `https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}.webp` })
			.setDescription(`Stream is in <#${data.channelId}>`)
			.addFields([
				{ name: 'IDs', value: "```ini\n" + `User = ${data.user.id}\nChannel = ${data.channelId}` + "```" }
			])
			.setTimestamp()

		channel.send({ embeds: [embed] })
	} else if (actionType === 'voiceChannelStreamStop') {
		const embed = new EmbedBuilder()
			.setColor(COLOR.purpleDark)
			.setTitle("**User Stream Stop**")
			.setAuthor({ name: `${data.user.globalName}`, iconURL: `https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}.webp` })
			.setDescription(`Stream was in <#${data.channelId}>`)
			.addFields([
				{ name: 'IDs', value: "```ini\n" + `User = ${data.user.id}\nChannel = ${data.channelId}` + "```" }
			])
			.setTimestamp()

		channel.send({ embeds: [embed] })
	} else if (actionType === 'channelCreate') {
		const embed = new EmbedBuilder()
			.setColor(COLOR.green)
			.setTitle("**Channel Create**")
			.setAuthor({ name: `${data.user.globalName}`, iconURL: `https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}.webp` })
			.setDescription(`Created channel <#${data.channelId}> (${data.channelName}) in the category <#${data.categoryId}>`)
			.addFields([
				{ name: 'IDs', value: "```ini\n" + `User = ${data.user.id}\nChannel = ${data.channelId}\nCategory = ${data.categoryId}` + "```" }
			])
			.setTimestamp()

		channel.send({ embeds: [embed] })
	} else if (actionType === 'channelDelete') {
		const embed = new EmbedBuilder()
			.setColor(COLOR.red)
			.setTitle("**Channel Delete**")
			.setAuthor({ name: `${data.user.globalName}`, iconURL: `https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}.webp` })
			.setDescription(`Deleted channel <#${data.channelId}> (${data.channelName}) in the category <#${data.categoryId}>`)
			.addFields([
				{ name: 'IDs', value: "```ini\n" + `User = ${data.user.id}\nChannel = ${data.channelId}\nCategory = ${data.categoryId}` + "```" }
			])
			.setTimestamp()

		channel.send({ embeds: [embed] })
	} else if (actionType === 'channelUpdate') {
		const embed = new EmbedBuilder()
			.setColor(COLOR.yellow)
			.setTitle("**Channel Update**")
			.setAuthor({ name: `${data.user.globalName}`, iconURL: `https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}.webp` })
			.setDescription(`Updated channel <#${data.channelId}> (${data.channelName})`)
			.addFields([])
			.setTimestamp()


		const fields = [];

		if (data.change_ArchiveDuration) {
			fields.push({
				name: "Archive Duration",
				value: `**Old:** ${data.oldArchiveDuration}\n**New:** ${data.newArchiveDuration}`,
				inline: false
			});
		}

		if (data.change_Name) {
			fields.push({
				name: "Name",
				value: `**Old:** ${data.oldName}\n**New:** ${data.newName}`,
				inline: false
			});
		}

		if (data.change_Nsfw) {
			fields.push({
				name: "NSFW",
				value: `**Old:** ${data.oldNsfw}\n**New:** ${data.newNsfw}`,
				inline: false
			});
		}

		if (data.change_RateLimit) {
			fields.push({
				name: "Rate Limit",
				value: `**Old:** ${data.oldRateLimit}\n**New:** ${data.newRateLimit}`,
				inline: false
			});
		}

		if (data.change_Topic) {
			fields.push({
				name: "Topic",
				value: `**Old:** ${data.oldTopic}\n**New:** ${data.newTopic}`,
				inline: false
			});
		}

		embed.addFields(fields);

		embed.addFields([{ name: 'IDs', value: "```ini\n" + `User = ${data.user.id}\nChannel = ${data.channelId}` + "```" }])

		channel.send({ embeds: [embed] })
	} else if (actionType === 'emojiCreate') {
		const embed = new EmbedBuilder()
			.setColor(COLOR.red)
			.setTitle("**Emoji Created**")
			.setAuthor({ name: `${data.user.globalName}`, iconURL: `https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}.webp` })
			.setDescription(`Added emoji <:${data.emojiIdentifier}>`)
			.setThumbnail(data.emojiImg)
			.addFields([
				{ name: 'IDs', value: "```ini\n" + `User = ${data.user.id}\nEmoji = ${data.emojiId}` + "```" }
			])
			.setTimestamp()

		channel.send({ embeds: [embed] })
	} else if (actionType === 'emojiDelete') {
		const embed = new EmbedBuilder()
			.setColor(COLOR.red)
			.setTitle("**Emoji Deleted**")
			.setAuthor({ name: `${data.user.globalName}`, iconURL: `https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}.webp` })
			.setDescription(`Deleted emoji <:${data.emojiIdentifier}>`)
			.setThumbnail(data.emojiImg)
			.addFields([
				{ name: 'IDs', value: "```ini\n" + `User = ${data.user.id}\nEmoji = ${data.emojiId}` + "```" }
			])
			.setTimestamp()

		channel.send({ embeds: [embed] })
	} else if (actionType === 'emojiUpdate') {
		const embed = new EmbedBuilder()
			.setColor(COLOR.red)
			.setTitle("**Emoji Updated**")
			.setAuthor({ name: `${data.user.globalName}`, iconURL: `https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}.webp` })
			.setDescription(`Updated emoji <:${data.emojiIdentifierNew}>`)
			.setThumbnail(data.emojiImg)
			.setTimestamp()

			if(data.emojiNameOld !== data.emojiNameNew) {
				embed.addFields([
					{ name: 'Name', value: `**Old:** ${data.emojiNameOld}\n**New:** ${data.emojiNameNew}` }
				])
			}
			if(data.emojiIdentifierOld !== data.emojiIndentifierNew) {
				embed.addFields([
					{ name: 'Identifier', value: `**Old:** ${data.emojiIdentifierOld}\n**New:** ${data.emojiIdentifierNew}` }
				])
			}

			embed.addFields([
				{ name: 'IDs', value: "```ini\n" + `User = ${data.user.id}\nEmoji = ${data.emojiId}` + "```" }
			])
			

		channel.send({ embeds: [embed] })
	}

}

module.exports = {
	sendInfo,
};