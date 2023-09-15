const { EmbedBuilder } = require('discord.js')
module.exports = {
    name: 'ping',
    description: 'Pong',
    // devOnly: Boolean,
    // testOnly: true,
    // options: Object[],
    // deleted: Boolean,
  
    callback: (client, interaction) => {
        const ping = new EmbedBuilder()
        .setColor(0x8cca12)
        .setTitle('🏓Pong!')
        .setDescription(`Ping is ${Date.now() - interaction.createdTimestamp} ms\n API ping is ${Math.round(client.ws.ping)} ms`);
        interaction.reply({ embeds: [ping]})
    },
  };