const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    // deleted: true,
    name: 'hello',
    description: 'Say Hello members',
    options: [
        {
            name: 'user',
            description: 'The user to say hello to',
            type: ApplicationCommandOptionType.Mentionable,
            required: true,
        },
    ],

    callback: async (client, interaction) => {

        // Get the mentioned user from the interaction
        const mentionedUser = interaction.options.getMentionable('user');
        
        if (mentionedUser) {
            // If the mentionedUser is a member (e.g., in a server, not a DM)
            if (interaction.guild) {
                // Get the member object from the guild
                const member = interaction.guild.members.cache.get(mentionedUser.id);
                
                    if (member) {
                        // Access the member's display name
                        const memberDisplayName = member.displayName;
                  
                        // Reply to the interaction with the member's display name
                        await interaction.reply(`You mentioned: ${memberDisplayName}`);
                    } else {
                        // Handle the case where the member is not found
                        await interaction.reply('Member not found.');
                    }
            } else {
                // Handle the case where the interaction is in a DM (no guild)
                await interaction.reply(`You mentioned: ${mentionedUser.username}`);
            }
        } else {
            // Handle the case where no mentionable user was mentioned
            await interaction.reply('No mentionable user mentioned.');
        }
    }
};