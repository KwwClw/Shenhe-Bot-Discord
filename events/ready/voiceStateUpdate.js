const { Client, Intents } = require("discord.js");
const { DateTime } = require('luxon');
const Discord = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] });

console.log("working");

client.on('voiceStateUpdate', (oldState, newState) => {
    const notificationChannelID = '1184790363337130074';
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

    if (beforeChannel && !afterChannel) {
        // Member left a voice channel
        const leftEmbed = new Discord.MessageEmbed()
            .setTitle('Left')
            .setDescription(`${member.displayName} has left ${beforeChannel.name}.`)
            .setColor('#FF0000')
            .setFooter(timestampThai);
        notificationChannel.send(leftEmbed);
    } else if (!beforeChannel && afterChannel) {
        // Member joined a voice channel
        const joinEmbed = new Discord.MessageEmbed()
            .setTitle('Joined')
            .setDescription(`${member.displayName} has joined ${afterChannel.name}.`)
            .setColor('#00FF00')
            .setFooter(timestampThai);
        notificationChannel.send(joinEmbed);
    }
});

module.exports = client;
