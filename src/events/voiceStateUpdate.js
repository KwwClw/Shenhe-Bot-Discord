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
    const desiredGuildID = process.env.GUILD_ID; // Guild ID for voice state update
    if (oldState.guild.id !== desiredGuildID || newState.guild.id !== desiredGuildID) {
        return; // Ignore events from other servers
    }

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
    const timestampThai = DateTime.utc().setZone(thaiTimeZone).toFormat('MMMM d, yyyy \'at\' h:mm a');
    // const timestampThai = DateTime.utc().setZone(thaiTimeZone).toLocaleString(DateTime.DATETIME_FULL);

    // Get member profile information
    const avatarURL = member.user.displayAvatarURL(); // Get member avatar URL
    // const roles = member.roles.cache.map(role => role.name).join(', '); // List member roles
    const roles = member.roles.cache
        .filter(role => role.name !== '@everyone') // กรอง @everyone ออก
        .map(role => role.name).join(', '); // List member roles

    const joinEmbed = {
        color: parseInt('248046', 16), // Convert hexadecimal color to integer
        title: `${member.displayName} เข้าห้อง`,
        thumbnail: {
            url: avatarURL, // Member avatar
        },
        fields: [
            {
                name: `Joined: ${afterChannel ? afterChannel.name : 'a voice channel'}`,
                value: `**Time**: ${timestampThai}\n**Roles**: ${roles}`,
                inline: false,
            },
        ],
    };

    const leftEmbed = {
        color: parseInt('9C2727', 16), // Convert hexadecimal color to integer
        title: `${member.displayName} ออกห้อง`,
        thumbnail: {
            url: avatarURL, // Member avatar
        },
        fields: [
            {
                name: `Left: ${beforeChannel ? beforeChannel.name : 'a voice channel'}`,
                value: `**Time**: ${timestampThai}\n**Roles**: ${roles}`,
                inline: false,
            },
        ],
    };

    const moveEmbed = {
        color: parseInt('0099ff', 16), // Convert hexadecimal color to integer
        title: `${member.displayName} เปลี่ยนห้อง`,
        thumbnail: {
            url: avatarURL, // Member avatar
        },
        fields: [
            {
                name: `Moved from: ${channelNameBefore} to ${channelNameAfter}`,
                value: `**Time**: ${timestampThai}\n**Roles**: ${roles}`,
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
        // console.log(roles);
    } else if (beforeChannel?.id !== afterChannel?.id) {
        // Channel change detected
        notificationChannel.send({ embeds: [moveEmbed] });
    }
});

client.login(process.env.TOKEN);
