require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const mongooes = require('mongoose');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.MessageContent,
    ],
});

(async () => {
    try {
        mongooes.set('strictQuery', false);
        await mongooes.connect(process.env.MONGODB_URI);
        console.log("Connected to DB.");

        eventHandler(client);

        client.login(process.env.TOKEN);
    } catch (error) {
        console.log(`Error: ${error}`)
    }
})();

client.on('messageCreate', (message) => {
    if (message.content === 'Hey' || message.content === 'hey') {
        message.reply('Hi!');
    }
});