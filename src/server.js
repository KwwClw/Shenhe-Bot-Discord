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

// Set start time when the bot starts
const start_time = new Date().toLocaleString('en-EN', { timeZone: 'Asia/Bangkok' });

client.once('ready', () => {
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    // Endpoint to provide status data in JSON format
    app.get('/api/status', (req, res) => {
        const info = {
            start_time: start_time, // Use the pre-set start_time
            bot_name: client.user.username,
            api_ping: Math.round(client.ws.ping)
        };
        res.json(info);
    });

    // Route to render the status page
    app.get('/', (req, res) => {
        res.render('page/index', {
            info: {
                start_time: start_time, // Use the pre-set start_time
                bot_name: client.user.username,
                api_ping: Math.round(client.ws.ping)
            }
        });
    });

    // Route for QR page
    app.get('/qr', (req, res) => {
        res.render('page/qr');
    });

    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
});

client.login(process.env.TOKEN);
