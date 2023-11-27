const { EmbedBuilder } = require('discord.js')
module.exports = {
    name: 'help',
    description: 'help commands',
    // devOnly: Boolean,
    // testOnly: true,
    // options: Object[],
    // deleted: Boolean,
  
    callback: (client, interaction) => {
        const embed = new EmbedBuilder()
        .setColor(0x13a4a6)
        .setTitle('Help')
        .setURL('https://kwwclw.github.io/shenhebot.github.io/')
        .setThumbnail('https://i.pinimg.com/564x/57/95/03/579503ddd342c1a1891fac0b46434f77.jpg')
        .addFields(
            { name: 'help', value: 'Get help command' },
            { name: 'namebot', value: 'Name of bot' },
            { name: 'random', value: 'Random number 1 to 50' },
            { name: 'Ping', value: 'Pings the bot and shows the latency' },
            );
        interaction.reply({ embeds: [embed] });
    },
  };