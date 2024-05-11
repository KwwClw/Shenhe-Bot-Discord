require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
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

client.on('voiceStateUpdate', (oldState, newState) => {
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

    const joinEmbed = {
        color: parseInt('0099ff', 16), // Convert hexadecimal color to integer
        title: 'Joined',
        // description: 'Some description here',
        fields: [
            {
                name: `${member.displayName} has joined ${beforeChannel ? beforeChannel.name : 'a voice channel'}.`,
                value: timestampThai,
                inline: false,
            },
        ],
    };

    const leftEmbed = {
        color: parseInt('0099ff', 16), // Convert hexadecimal color to integer
        title: 'Left',
        // description: 'Some description here',
        fields: [
            {
                name: `${member.displayName} has left ${beforeChannel ? beforeChannel.name : 'a voice channel'}.`,
                value: timestampThai,
                inline: false,
            },
        ],
    };

        if (beforeChannel && !afterChannel) {
            // Member left a voice channel
            notificationChannel.send({ embeds: [leftEmbed] });
        } else if (!beforeChannel && afterChannel) {
            // Member joined a voice channel
            notificationChannel.send({ embeds: [joinEmbed] });
        }
    });
    
    client.login(process.env.TOKEN);