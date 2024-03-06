const fs = require('fs');
const path = require('path');

function getSettings(server, type) {
	const serversData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/servers.json')));

	const serverSettings = serversData[server] && serversData[server][type] ? serversData[server][type] : null;
	const channel = serverSettings || null;

	return channel;
}

module.exports = {
	getSettings
};
