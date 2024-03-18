const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const { sendInfo } = require('../scripts/sendInfo'); //sendInfo(server, actionType, data)
const client = require('..');


client.on('guildMemberRemove', async (member) => {
	const AuditLogFetch = await member.guild.fetchAuditLogs({ limit: 1, type: 20 });
	const kickInfo = AuditLogFetch.entries.first();

	const now = Date.now();

	if (member.user.id === kickInfo.targetId && !(kickInfo.createdTimestamp <= now - 1000 * 60 * 1)) {
		try {
			//Get member & server id, actionType info
			let server = member.guild.id;
			let actionType = "guildKick";

			//Add data
			let data = {
				serverId: member.guild.id,
				userId: kickInfo.executorId,

				kickedUserId: kickInfo.targetId,
				reason: kickInfo.reason || "No reason provided",
				kickedUser: { ...kickInfo.target },

				user: { ...member.user },
				timestamp: Math.floor(Date.now() / 1000),
			};
			sendInfo(server, actionType, data)

		} catch (err) {
			console.error(err);
		}


} else { // Leave
	try {
		//Get member & server id, actionType info
		let server = member.guild.id;
		let actionType = "guildLeave";

		//Add data
		let data = {
			serverId: member.guild.id,

			user: { ...member.user },
			timestamp: Math.floor(Date.now() / 1000),
		};

		sendInfo(server, actionType, data)

	} catch(err) {
		console.error(err);
	}
}


});