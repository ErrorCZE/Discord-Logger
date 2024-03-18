const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const { sendInfo } = require('../scripts/sendInfo'); //sendInfo(server, actionType, data)
const client = require('..');


client.on('guildBanAdd', async (ban) => {
	await new Promise(resolve => setTimeout(resolve, 10000));
	
	const AuditLogFetch = await ban.guild.fetchAuditLogs({limit: 1, type: 22});
	const banInfo = AuditLogFetch.entries.first();

	//Get member & server id, actionType info
	let member = banInfo.executor;

	let server = ban.guild.id;
	let actionType = "guildBanAdd";

	//Add data
	let data = {
		serverId: ban.guild.id,
		userId: banInfo.executorId,

		bannedUserId: banInfo.targetId,
		reason: banInfo.reason || "No reason provided",
		bannedUser: { ...banInfo.target },

		user: { ...member },
		timestamp: Math.floor(Date.now() / 1000),
	};

	sendInfo(server, actionType, data)
});