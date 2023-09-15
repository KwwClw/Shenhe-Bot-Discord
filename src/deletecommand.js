const { REST, Routes } = require('discord.js');
require('dotenv').config();

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

    // rest.delete(Routes.applicationGuildCommand(process.env.CLIENT_ID, process.env.GUILD_ID, '1129780122661171282'))
    // .then(() => console.log('Successfully deleted guild command'))
	// .catch(console.error);

    // for global commands
    rest.delete(Routes.applicationCommand(process.env.CLIENT_ID, '1129787592330719292'))
	.then(() => console.log('Successfully deleted application command'))
	.catch(console.error);