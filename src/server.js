var http = require('http');
const PORT = process.env.PORT || 8080;
require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

var datetime = new Date();
var options = {
    timeZone: 'Asia/Bangkok' // Set the time zone to Thai time
};
var formattedDatetime = datetime.toLocaleString('en-EN', options);

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.MessageContent,
    ],
});

function keepAlive() {
    http.createServer(function(req, res) {
        res.write(`${client.user.username} is online.\n${formattedDatetime}`);
        res.end();
    }).listen(PORT);
}

console.log(`Server is online on port ${PORT}`);

client.login(process.env.TOKEN); // Replace with your bot token

module.exports = keepAlive;
