require('dotenv').config();
const { testServer, clientId } = require('../config.json');
const { REST, Routes, ApplicationCommandOptionType, ApplicationCommand } = require('discord.js');

const commands = [
    {
        name: 'hey',
        description: 'Replies with hey!',
    },
    {
        name: 'ping',
        description: 'pop',
    },
    {
        name: 'add',
        description: 'Adds two nums',
        options: [
            {
                name: 'first-number',
                description: 'The first number',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'second-number',
                description: 'The first number',
                type: ApplicationCommandOptionType.Number,
                required: true,
            }
        ]
    },
    {
        name: 'embed',
        description: 'Info',
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(clientId, testServer), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);
