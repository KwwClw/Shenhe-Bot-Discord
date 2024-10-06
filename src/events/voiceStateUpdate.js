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
    const desiredGuildID = process.env.GUILD_ID; // guild ID for voice state update
    if (oldState.guild.id !== desiredGuildID || newState.guild.id !== desiredGuildID) {
        return; // Ignore events from other servers
    }
    // const notificationChannelID = '1184790363337130074';
    const notificationChannelID = process.env.CHANNEL_ID;
    const notificationChannel = client.channels.cache.get(notificationChannelID);
    if (!notificationChannel) {
        console.error('Error: Notification channel not found');
        return;
    }

    const member = newState.member;
    const beforeChannel = oldState.channel;
    const afterChannel = newState.channel;
    const channelNameBefore = beforeChannel ? beforeChannel.name : 'a voice channel';
    const channelNameAfter = afterChannel ? afterChannel.name : 'a voice channel';

    const thaiTimeZone = 'Asia/Bangkok';
    const timestampThai = DateTime.utc().setZone(thaiTimeZone).toLocaleString(DateTime.DATETIME_FULL);

    const joinEmbed = {
        color: parseInt('399918', 16), // Convert hexadecimal color to integer
        title: `${member.displayName} เข้าห้อง`,
        // description: 'Some description here',
        fields: [
            {
                name: `${member.displayName} has joined ${afterChannel ? afterChannel.name : 'a voice channel'}.`,
                value: timestampThai,
                inline: false,
            },
        ],
    };

    const leftEmbed = {
        color: parseInt('b8001f', 16), // Convert hexadecimal color to integer
        title: `${member.displayName} ออกห้อง`,
        // description: 'Some description here',
        fields: [
            {
                name: `${member.displayName} has left ${beforeChannel ? beforeChannel.name : 'a voice channel'}.`,
                value: timestampThai,
                inline: false,
            },
        ],
    };

    const moveEmbed = {
        color: parseInt('0099ff', 16), // Convert hexadecimal color to integer
        title: `${member.displayName} เปลี่ยนห้อง`,
        fields: [
            {
                name: `${member.displayName} has moved from ${channelNameBefore} to ${channelNameAfter}.`,
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
        } else if (beforeChannel?.id !== afterChannel?.id) {
            // Channel change detected
            notificationChannel.send({ embeds: [moveEmbed] });
        }
    });
    
client.login(process.env.TOKEN);
