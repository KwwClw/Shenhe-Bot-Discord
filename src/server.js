const express = require('express');
const app = express();
const path = require('path');
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

const datetime = new Date();
const options = { timeZone: 'Asia/Bangkok' }; // Set the time zone to Thai time
const formattedDatetime = datetime.toLocaleString('en-EN', options);

client.once('ready', () => {

    const info = {
        start_time: formattedDatetime,
        bot_name: client.user.username,
        ping: Date.now() - interaction.createdTimestamp,
        api_ping: Math.round(client.ws.ping)
    }

    app.set('view engine', 'ejs');

    app.set('views', path.join(__dirname, 'views'));

    app.get('/', (req, res) => {
        res.render('page/index', {
            info: info
        })
    });

    app.get('/qr', (req, res) => {
        res.render('page/qr')
    });

    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });

});

client.login(process.env.TOKEN); // Replace with your bot token
