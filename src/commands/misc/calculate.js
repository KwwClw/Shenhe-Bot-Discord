module.exports = {
    name: 'calculate',
    description: 'Calculate numbers',
    options: [
        {
            name: 'num1',
            description: 'Input your num1',
            type: 10,
            required: true,
        },
        {
            name: 'operator',
            description: 'Input your operator',
            type: 3,
            choices: [
                {
                    name: '+',
                    value: '+',
                },
                {
                    name: '-',
                    value: '-',
                },
                {
                    name: '*',
                    value: '*',
                },
                {
                    name: '/',
                    value: '/',
                }
            ],
            required: true,
        },
        {
            name: 'num2',
            description: 'Input your num2',
            type: 10,
            required: true,
        },
    ],

    callback: (client, interaction) => {
        const num1 = interaction.options.getNumber('num1');
        const operator = interaction.options.getString('operator');
        const num2 = interaction.options.getNumber('num2');

        let result;
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 == 0) return interaction.reply({
                    content: 'Invalid operator',
                    ephemeral: true,
                });
                result = num1 / num2;
                break;
            default:
                return interaction.reply({
                    content: 'Invalid operator',
                    ephemeral: true,
                });
        }
        interaction.reply({
            content: `${num1}  ${operator}  ${num2}  =  ${result}`,
            ephemeral: false,
        });
    }

};