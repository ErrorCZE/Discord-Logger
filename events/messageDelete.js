const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const { sendInfo } = require('../scripts/sendInfo'); //sendInfo(server, actionType, data)
const client = require('..');


client.on('messageDelete', async (message) => {
	if (message.partial) {
		let msg = await message.fetch()
		console.log(msg.content)
	}
	
	if (message.content === null) return;
	if (message.author.bot) return;

	//Get member & server id, actionType info
	let memberId = message.author.id;
	let member = message.guild.members.cache.get(memberId);

	let server = message.guild.id;
	let actionType = "messageDelete";

	//Add data
	let data = {
		serverId: message.guild.id,
		userId: member.user.id,

		channelId: message.channel.id,
		messageId: message.id,
		content: message.content,

		user: { ...member.user },
		timestamp: Math.floor(Date.now() / 1000),
	};

	sendInfo(server, actionType, data)
});