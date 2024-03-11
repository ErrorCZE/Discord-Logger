const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const { sendInfo } = require('../scripts/sendInfo'); //sendInfo(server, actionType, data)
const client = require('..');


client.on('guildBanRemove', async (ban) => {
	const AuditLogFetch = await ban.guild.fetchAuditLogs({limit: 1, type: 23});
	const banInfo = AuditLogFetch.entries.first();

	//Get member & server id, actionType info
	let member = banInfo.executor;

	let server = ban.guild.id;
	let actionType = "guildBanRemove";

	//Add data
	let data = {
		serverId: ban.guild.id,
		userId: banInfo.executorId,

		bannedUserId: banInfo.targetId,
		bannedUser: { ...banInfo.target },

		user: { ...member },
		timestamp: Math.floor(Date.now() / 1000),
	};

	sendInfo(server, actionType, data)
});