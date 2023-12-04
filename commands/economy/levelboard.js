const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    EmbedBuilder,
} = require("discord.js");
const level = require('../../models/Level')

module.exports = {
    /**
     * @param {Client} client
     * @param {Interaction} interaction
     */

    deleted: true,
    name: 'level board',
    description: 'See ranking of people in server',

    callback: async (client, interaction) => {
        if(!interaction.inGuild()) {
            interaction.reply("You can only run this command inside a sever.");
            return;
        }

        const embed = new EmbedBuilder()
        .setColor(0x13a4a6)
        .setTitle("This server's level rank")
        .setDescription('One of the top 10 members on this server. that can collect the most own levels, respectively, as follows')
        .addFields(
            { name: 'help', value: 'Get help command' },
            { name: 'namebot', value: 'Name of bot' },
            { name: 'random', value: 'Random number 1 to 50' },
            { name: 'Ping', value: 'Pings the bot and shows the latency' },
        );
    }
};