const { prefix } = require('../config');
const allowedIds = require('../allowed.json')
const strings = require('../strings.json')
const utils = require('../utils')
module.exports = (client, message) => {
    if (message.content.indexOf(prefix) == 0) {
        if (message.author.id == client.user.id) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        const cmd = client.commands.get(command);
        if (!cmd) return;
        if (!allowedIds.allowed.includes(message.author.id)) {message.channel.send(strings.permissionDenied); utils.log(`${message.author.username} tried to run the command ${message.content} but permission was not accepted`); return; }
        cmd.run(client, message, args);
        return
    }
};