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

			channel: newUser.channel,
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

			channel: oldUser.channel,
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

			oldChannel: oldUser.channel,
			newChannel: newUser.channel,
			oldChannelId: oldUser.channel.id,
			newChannelId: newUser.channel.id,

			user: { ...member.user },
		};

		sendInfo(server, actionType, data)
	}


	// ...
	//Dodělat: Start streamu, Vypnutí streamu, Server mute, Server unmute, Server deaf, Server undeaf

});