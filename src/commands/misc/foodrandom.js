const data = require('../../../data/foodData.json');
const rice = data.rice;
const noodles = data.noodles;

module.exports = {
    name: 'foodrandom',
    description: 'random food',
    options: [
        {
            name: 'menu',
            description: 'select menu for random',
            type: 3,
            choices: [
                {
                    name: 'rice',
                    value: '1',
                },
                {
                    name: 'noodles',
                    value: '2',
                },
            ],
            required: true,
        },
    ],
  
    callback: (client, interaction) => {
        const menu = interaction.options.getString('menu');
        if (menu === '1') {
            interaction.reply(rice[Math.floor(Math.random() * rice.length)])
        }
        if (menu === '2') {
            interaction.reply(noodles[Math.floor(Math.random() * noodles.length)])
        }
    },
  };