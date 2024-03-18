const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const { sendInfo } = require('../scripts/sendInfo'); //sendInfo(server, actionType, data)
const client = require('..');


client.on('guildMemberAdd', async (member) => {

	try {
		//Get member & server id, actionType info
		let server = member.guild.id;
		let actionType = "guildJoin";

		//Add data
		let data = {
			serverId: member.guild.id,

			user: { ...member.user },
			timestamp: Math.floor(Date.now() / 1000),
		};
		sendInfo(server, actionType, data)

	} catch (err) {
		console.error(err);
	}



});