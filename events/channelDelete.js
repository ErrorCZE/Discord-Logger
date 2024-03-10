const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const { sendInfo } = require('../scripts/sendInfo'); //sendInfo(server, actionType, data)
const client = require('..');


client.on('channelDelete', async (channel) => {

	const AuditLogFetch = await channel.guild.fetchAuditLogs({limit: 1, type: 12});
	const channelInfo = AuditLogFetch.entries.first();

	//Get member & server id, actionType info
	let member = channelInfo.executor;

	let server = channel.guildId;
	let actionType = "channelDelete";

	//Add data
	let data = {
		serverId: channel.guildId,
		userId: channelInfo.executorId,

		channelName: channel.name,
		channelId: channel.id,
		categoryId: channel.parentId,

		user: { ...member },
		timestamp: Math.floor(Date.now() / 1000),
	};
	sendInfo(server, actionType, data)
});