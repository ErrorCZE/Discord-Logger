const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const { sendInfo } = require('../scripts/sendInfo'); //sendInfo(server, actionType, data)
const client = require('..');


client.on('messageUpdate', async (oldMessage, newMessage) => {
	if(newMessage.content === null || oldMessage.content === null) return;
	if (newMessage.author.bot || oldMessage.author.bot) return;

	//Get member & server id, actionType info
	let memberId = newMessage.author.id;
	let member = newMessage.guild.members.cache.get(memberId);

	let server = newMessage.guild.id;
	let actionType = "messageUpdate";

	//Add data
	let data = {
		serverId: newMessage.guild.id,
		userId: member.user.id,

		channelId: newMessage.channel.id,
		messageId: newMessage.id,
		oldContent: oldMessage.content,
		newContent: newMessage.content,

		user: { ...member.user },
		timestamp: Math.floor(Date.now() / 1000),
	};

	sendInfo(server, actionType, data)
});