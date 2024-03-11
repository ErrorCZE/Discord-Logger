const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const { sendInfo } = require('../scripts/sendInfo'); //sendInfo(server, actionType, data)
const client = require('..');


client.on('emojiCreate', async (emoji) => {

	const AuditLogFetch = await emoji.guild.fetchAuditLogs({limit: 1, type: 60});
	const emojiInfo = AuditLogFetch.entries.first();

	//Get member & server id, actionType info
	let member = emojiInfo.executor;

	let server = emoji.guild.id;
	let actionType = "emojiCreate";

	//Add data
	let data = {
		serverId: emoji.guild.id,
		userId: emojiInfo.executorId,

		emojiName: emoji.name,
		emojiId: emoji.id,
		emojiImg: emoji.url,
		emojiAnimated: emoji.animated,
		emojiIdentifier: emoji.identifier,

		user: { ...member },
		timestamp: Math.floor(Date.now() / 1000),
	};
	sendInfo(server, actionType, data)
});