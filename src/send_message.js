require('dotenv').config();
const {Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ],
})

const roles = [
    {
        id: '1070699571740688474',
        label: 'ztx',
    },
    {
        id: '1070699263585165365',
        label: 'dxk',
    },
    {
        id: '1070764650637041814',
        label: 'bld',
    },
]

client.on('ready', async (c) => {
    try {
        const channel = await client.channels.cache.get('1044987436536696867');
        if(!channel) return;

        // const row = new ActionRowBuilder();

        // roles.forEach((role) =>{
        //     row.components.push(
        //         new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
        //     )
        // });

        // await channel.send({
        //     content: 'Claim the role',
        //     components: [row],
        // });

        await channel.send({
            content: '<@352773734098141204> <ГосУслуги> Ваша заявку на получение альтушки, была одобрена'
        });
        process.exit();

    } catch (error) {
        console.log(error)        
    }
});


client.login(process.env.TOKEN);