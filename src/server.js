var http = require('http');
const PORT = process.env.PORT || 8080
require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

var datetime = new Date();

var options = { 
    // year: 'numeric', 
    // month: 'long', 
    // day: 'numeric', 
    // hour: '2-digit', 
    // minute: '2-digit', 
    // second: '2-digit', 
    // hour12: false,
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

http.createServer(function(req, res) {
    // res.write("I'm alive!\n");
    res.write(`${client.user.tag} is online.\n${formattedDatetime}`)
    res.end();
}).listen(PORT);

console.log("server is online");

client.login(process.env.TOKEN); // Replace with your bot token