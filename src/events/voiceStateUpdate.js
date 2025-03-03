require('dotenv').config();
const { Client, IntentsBitField, AuditLogEvent, Events } = require('discord.js');
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

client.on('voiceStateUpdate', async (oldState, newState) => {
    const guild = newState.guild; // ดึง guild object
    
    const desiredGuildID = process.env.GUILD_ID;
    if (guild.id !== desiredGuildID) {
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

    const avatarURL = member.user.displayAvatarURL();
    const roles = member.roles.cache.filter(role => role.name !== '@everyone').map(role => role.name).join(', ') || 'No roles';

    // ดึงข้อมูลจาก Audit Logs
    const auditLogs = await guild.fetchAuditLogs({ type: 24, limit: 10 });
    const logEntry = auditLogs.entries.find(entry => 
        entry.target.id === member.id && entry.createdTimestamp > Date.now() - 30000 // ตรวจสอบภายใน 30 วินาที
    );

    let movedBy = "ตัวเอง"; 

    if (logEntry) {
        movedBy = `ถูกย้ายโดย ${logEntry.executor.tag}`;
    } else if (beforeChannel && afterChannel) {
        movedBy = `เปลี่ยนเอง`; // เพิ่มเงื่อนไขให้ชัดเจนขึ้น
    }
    
    // console.log("Audit Log Entries:", auditLogs.entries.map(e => ({
    //     target: e.target.id,
    //     executor: e.executor.tag,
    //     createdAt: e.createdTimestamp
    // })));
    
    // console.log("Selected Log Entry:", logEntry ? {
    //     target: logEntry.target.id,
    //     executor: logEntry.executor.tag,
    //     createdAt: logEntry.createdTimestamp
    // } : "No matching log found");

    console.log("Audit Log Entries:", auditLogs.entries);

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

    // const moveEmbed = {
    //     color: parseInt('0099ff', 16), // Convert hexadecimal color to integer
    //     title: `${member.displayName} เปลี่ยนห้อง`,
    //     thumbnail: {
    //         url: avatarURL, // Member avatar
    //     },
    //     fields: [
    //         {
    //             name: `Moved from: ${channelNameBefore} to ${channelNameAfter}`,
    //             value: `**Time**: ${timestampThai}\n**Roles**: ${roles}\n**Moved by**: ${movedBy}`,
    //             inline: false,
    //         },
    //     ],
    // };

    const moveEmbed = {
        color: parseInt('0099ff', 16),
        title: `${member.displayName} เปลี่ยนห้อง`,
        thumbnail: {
            url: avatarURL,
        },
        fields: [
            {
                name: `Moved from: ${channelNameBefore} to ${channelNameAfter}`,
                value: `**Time**: ${timestampThai}\n**Roles**: ${roles}\n**Moved by**: รอแก้บัคก่อนนะครับ`,
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
    } else if (beforeChannel && afterChannel && beforeChannel?.id !== afterChannel?.id) {
        notificationChannel.send({ embeds: [moveEmbed] });
    };
});

client.login(process.env.TOKEN);
