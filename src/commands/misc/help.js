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
        .setDescription('Help Command')
        .addFields(
            { name: 'help', value: 'Get help command' },
            { name: 'namebot', value: 'Name of bot' },
            { name: 'random', value: 'Random number 1 to 50' },
            { name: 'Ping', value: 'Pings the bot and shows the latency' },
            );
        interaction.reply({ embeds: [embed] });
    },
  };