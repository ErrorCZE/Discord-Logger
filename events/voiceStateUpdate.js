const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const { sendInfo } = require('../scripts/sendInfo'); //sendInfo(server, actionType, data)
const client = require('..');


client.on('voiceStateUpdate', async (oldUser, newUser) => {
	let memberId = oldUser.id;
	let member = oldUser.guild.members.cache.get(memberId);

	let server = oldUser.guild.id;

	//Channel join (not switching channels)
	if ((!oldUser.channel) && (newUser.channel)) {

		let actionType = "voiceChannelJoin";

		//Add data
		let data = {
			serverId: newUser.guild.id,
			userId: newUser.id,

			channelId: newUser.channel.id,

			user: { ...member.user },
		};

		sendInfo(server, actionType, data)
	}

	//Channel leave (not switching channels)
	if ((oldUser.channel) && (!newUser.channel)) {

		let actionType = "voiceChannelLeave";

		//Add data
		let data = {
			serverId: oldUser.guild.id,
			userId: oldUser.id,

			channelId: oldUser.channel.id,

			user: { ...member.user },
		};

		sendInfo(server, actionType, data)
	}

	//Channel switch
	if ((oldUser.channel) && (newUser.channel) && (oldUser.channel !== newUser.channel)) {

		let actionType = "voiceChannelSwitch";

		//Add data
		let data = {
			serverId: newUser.guild.id,
			userId: newUser.id,

			oldChannelId: oldUser.channel.id,
			newChannelId: newUser.channel.id,

			user: { ...member.user },
		};

		sendInfo(server, actionType, data)
	}

	//Stream Start & Stop
	if ((oldUser.channel) && (newUser.channel) && (oldUser.channel === newUser.channel) && (oldUser.streaming !== newUser.streaming)) {

		let actionType = (oldUser.streaming && !newUser.streaming) ? "voiceChannelStreamStop" : (newUser.streaming && !oldUser.streaming) ? "voiceChannelStreamStart" : "voiceChannelStreamStop";

		//Add data
		let data = {
			serverId: newUser.guild.id,
			userId: newUser.id,

			channelId: newUser.channel.id,

			user: { ...member.user },
		};

		sendInfo(server, actionType, data)
	}
});