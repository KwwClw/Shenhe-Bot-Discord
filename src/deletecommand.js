const { REST } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

async function deleteCommands() {
    try {
        // Fetch all global commands
        const globalCommands = await rest.get(
            Routes.applicationCommands(clientId)
        );

        // Delete all global commands
        for (const command of globalCommands) {
            await rest.delete(
                Routes.applicationCommand(clientId, command.id)
            );
            console.log(`Deleted global command ${command.name}`);
        }

        // Fetch all guild commands if GUILD_ID is provided
        if (guildId) {
            const guildCommands = await rest.get(
                Routes.applicationGuildCommands(clientId, guildId)
            );

            // Delete all guild commands
            for (const command of guildCommands) {
                await rest.delete(
                    Routes.applicationGuildCommand(clientId, guildId, command.id)
                );
                console.log(`Deleted guild command ${command.name}`);
            }
        }

        console.log('Successfully deleted all registered commands.');
    } catch (error) {
        console.error('Error deleting commands:', error);
    }
}

deleteCommands();
