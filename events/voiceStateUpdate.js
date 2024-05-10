const { Client, GatewayIntentBits } = require('discord.js');
const { DateTime } = require('luxon');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.on('voiceStateUpdate', (voiceState) => {
    const oldState = voiceState.old;
    const newState = voiceState.new;
    // Your existing code here...
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
});

// client.on('voiceStateUpdate', (voice) => {
//     console.log(voice);
// 	console.log("voice");
// });
