const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const { sendInfo } = require('../scripts/sendInfo'); //sendInfo(server, actionType, data)
const client = require('..');


client.on('voiceStateUpdate', async (oldUser, newUser) => {
	console.log("================================= new ============================")
	console.log(JSON.stringify(newUser))
	console.log("================================= old ============================")
	console.log(JSON.stringify(oldUser))
	return;


	let memberId = newMessage.author.id;
	let member = newMessage.guild.members.cache.get(memberId);

	let server = channel.guild.id;
	let actionType = "voiceStateUpdate";

	//Add data
	let data = {
		serverId: channel.guild.id,
		userId: member.user.id,

		channelId: channel.id,
		channelName: channel.name,

		user: { ...member.user },
	};

	sendInfo(server, actionType, data)
});