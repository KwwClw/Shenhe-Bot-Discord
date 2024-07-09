require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const mongoose = require('mongoose');
const eventHandler = require('./src/handlers/eventHandler.js');
const keep_alive = require('./src/server.js');
require('./src/events/voiceStateUpdate.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.MessageContent,
    ],
});

keep_alive();

(async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to DB.");

        eventHandler(client);

        client.login(process.env.TOKEN);
    } catch (error) {
        console.log(`ERror: ${error}`)
    }
})();

client.on('messageCreate', (message) => {
    if (message.content === 'Hey' || message.content === 'hey') {
        message.reply('Hi!');
    }
});