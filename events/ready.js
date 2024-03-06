const client = require('..')
const chalk = require('chalk')

client.on("ready", () => {
	let allUsers = [];
	client.guilds.cache.forEach(async (guild) => {
		const guildMembers = await guild.members.fetch();
		allUsers.push(...guildMembers.map(member => member.user));
	});
	client.user.setStatus("online")
	console.log(chalk.red(`Logged in as ${client.user.tag}!`))
});
