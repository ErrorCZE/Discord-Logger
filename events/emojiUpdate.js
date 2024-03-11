const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const { sendInfo } = require('../scripts/sendInfo'); //sendInfo(server, actionType, data)
const client = require('..');


client.on('emojiUpdate', async (oldEmoji, newEmoji) => {

	if (oldEmoji.name !== newEmoji.name) {
		const AuditLogFetch = await newEmoji.guild.fetchAuditLogs({ limit: 1, type: 61 });
		const emojiInfo = AuditLogFetch.entries.first();

		//Get member & server id, actionType info
		let member = emojiInfo.executor;

		let server = oldEmoji.guild.id;
		let actionType = "emojiUpdate";

		//Add data
		let data = {
			serverId: oldEmoji.guild.id,
			userId: emojiInfo.executorId,

			emojiNameOld: oldEmoji.name,
			emojiNameNew: newEmoji.name,
			emojiId: oldEmoji.id,
			emojiImg: oldEmoji.url,
			emojiAnimated: oldEmoji.animated,
			emojiIdentifierOld: oldEmoji.identifier,
			emojiIdentifierNew: newEmoji.identifier,

			user: { ...member },
			timestamp: Math.floor(Date.now() / 1000),
		};
		sendInfo(server, actionType, data)
	}
});