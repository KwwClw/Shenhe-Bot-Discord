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
        bot_name: client.user.username
    }

    app.set('view engine', 'ejs');

    app.set('views', path.join(__dirname, 'views'));

    app.get('/', (req, res) => {
        res.render('page/index', {
            info: info
        })
    });

    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });

});

// client.once('ready', () => {
//     http.createServer(function (req, res) {
//         if (req.url === '/') {
//             fs.readFile(__dirname + '/src/views/page/index.ejs', function (err, data) {
//                 if (err) {
//                     res.writeHead(500);
//                     res.end('Error loading index.ejs');
//                 } else {
//                     res.setHeader('Content-Type', 'text/ejs');
//                     res.writeHead(200);
//                     res.end(data);
//                 }
//             });
//         } else if (req.url === '/status') {
//             var datetime = new Date();
//             var options = { timeZone: 'Asia/Bangkok' }; // Set the time zone to Thai time
//             var formattedDatetime = datetime.toLocaleString('en-EN', options);
//             res.setHeader('Content-Type', 'application/json');
//             res.writeHead(200);
//             res.end(JSON.stringify({
//                 status: `${client.user.username} is online.`,
//                 datetime: formattedDatetime
//             }));
//         } else {
//             res.writeHead(404);
//             res.end('Not Found');
//         }
//     }).listen(PORT, () => {
//         console.log(`Server is online on port ${PORT}`);
//     });
// });

client.login(process.env.TOKEN); // Replace with your bot token
