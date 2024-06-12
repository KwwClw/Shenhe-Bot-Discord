var http = require('http');
const PORT = process.env.PORT || 8080;
require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.MessageContent,
    ],
});

http.createServer((req, res) => {
    let datetime = new Date();

    let options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false,
        timeZone: 'Asia/Bangkok' // Set the time zone to Thai time
    };

    let formattedDatetime = datetime.toLocaleString('en-EN', options);

    res.writeHead(200, {'Content-Type': 'text/plain'});
    if (client.user) {
        res.write(`${client.user.tag} is online.\n${formattedDatetime}`);
    } else {
        res.write(`Bot is starting...\n${formattedDatetime}`);
    }
    res.end();
}).listen(PORT);

console.log(`Server is online on port ${PORT}`);

client.login(process.env.TOKEN).catch(console.error); // Replace with your bot token
