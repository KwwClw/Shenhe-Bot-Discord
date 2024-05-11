require('dotenv').config();
const { Client, EmbedBuilder, IntentsBitField } = require('discord.js');
const { DateTime } = require('luxon');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.MessageContent,
		IntentsBitField.Flags.GuildVoiceStates,
    ],
});

client.on('voiceStateUpdate', (oldState, newState, message) => {
    const notificationChannelID = '1094099646525222972';
    const notificationChannel = client.channels.cache.get(notificationChannelID);
    if (!notificationChannel) {
        console.error('Error: Notification channel not found');
        return;
    }

    const member = newState.member;
    const beforeChannel = oldState.channel;
    const afterChannel = newState.channel;

    const thaiTimeZone = 'Asia/Bangkok';
    const timestampThai = DateTime.utc().setZone(thaiTimeZone).toLocaleString(DateTime.DATETIME_FULL);

    const leftEmbed = new EmbedBuilder()
    .setColor('#FF0000')
    .setTitle('Left')
    .setDescription(`${member.displayName} has left ${beforeChannel.name}.`)
    .setFooter(timestampThai);

    const joinEmbed = new EmbedBuilder()
    .setColor('#00FF00')
    .setTitle('join')
    .setDescription(`${member.displayName} has join ${beforeChannel.name}.`)
    .setFooter(timestampThai);

    if (beforeChannel && !afterChannel) {
        // Member left a voice channel
        notificationChannel.send({ embeds: [leftEmbed] });
    } else if (!beforeChannel && afterChannel) {
        // Member joined a voice channel
        notificationChannel.send({ embeds: [joinEmbed] });
    }
});

client.login(process.env.TOKEN);