const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const { sendInfo } = require('../scripts/sendInfo'); //sendInfo(server, actionType, data)
const client = require('..');


client.on('channelCreate', async (channel) => {

	const AuditLogFetch = await channel.guild.fetchAuditLogs({limit: 1, type: 10});
	const channelInfo = AuditLogFetch.entries.first();

	//Get member & server id, actionType info
	let member = channelInfo.executor;

	let server = channel.guildId;
	let actionType = "channelCreate";

	//Add data
	let data = {
		serverId: channel.guildId,
		userId: channelInfo.executorId,

		channelName: channel.name,
		channelId: channel.id,
		categoryId: channel.parentId,
		nsfw: channel.nsfw,
		created: channel.createdTimestamp,

		user: { ...member },
	};

	console.log(JSON.stringify(data));
	return;
	sendInfo(server, actionType, data)
});