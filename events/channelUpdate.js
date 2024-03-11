const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const { sendInfo } = require('../scripts/sendInfo'); //sendInfo(server, actionType, data)
const client = require('..');

/*

TODO:
	- Permission logging

*/

client.on('channelUpdate', async (oldChannel, newChannel) => {
	if (oldChannel === newChannel) return;

	const AuditLogFetch = await newChannel.guild.fetchAuditLogs({ limit: 1, type: 11 });
	const channelInfo = AuditLogFetch.entries.first();

	//Get member & server id, actionType info
	let member = channelInfo.executor;

	let server = newChannel.guildId;
	let actionType = "channelUpdate";

	// Add data
	let change_ArchiveDuration = channelInfo.changes.some(change => change.key === "default_auto_archive_duration");
	let change_Name = channelInfo.changes.some(change => change.key === "name");
	let change_Nsfw = channelInfo.changes.some(change => change.key === "nsfw");
	let change_RateLimit = channelInfo.changes.some(change => change.key === "rate_limit_per_user");
	let change_Topic = channelInfo.changes.some(change => change.key === "topic");

	let data = {
		serverId: oldChannel.guildId,
		userId: channelInfo.executorId,
		channelName: oldChannel.name,
		channelId: oldChannel.id,

		change_ArchiveDuration,
		change_Name,
		change_Nsfw,
		change_RateLimit,
		change_Topic,

		...(change_ArchiveDuration && {
			oldArchiveDuration: channelInfo.changes.find(change => change.key === "default_auto_archive_duration").old,
			newArchiveDuration: channelInfo.changes.find(change => change.key === "default_auto_archive_duration").new,
		}),
		...(change_Name && {
			oldName: channelInfo.changes.find(change => change.key === "name").old,
			newName: channelInfo.changes.find(change => change.key === "name").new,
		}),
		...(change_Nsfw && {
			oldNsfw: channelInfo.changes.find(change => change.key === "nsfw").old,
			newNsfw: channelInfo.changes.find(change => change.key === "nsfw").new,
		}),
		...(change_RateLimit && {
			oldRateLimit: channelInfo.changes.find(change => change.key === "rate_limit_per_user").old,
			newRateLimit: channelInfo.changes.find(change => change.key === "rate_limit_per_user").new,
		}),
		...(change_Topic && {
			oldTopic: channelInfo.changes.find(change => change.key === "topic").old,
			newTopic: channelInfo.changes.find(change => change.key === "topic").new,
		}),

		user: { ...member },
		timestamp: Math.floor(Date.now() / 1000),
	};

	sendInfo(server, actionType, data)
});