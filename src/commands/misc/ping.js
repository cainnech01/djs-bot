module.exports = {
    name: 'ping',
    description: 'Pong!',
    //devOnly: true,
    // testOnly: Boolean,
    options: [],
    // deleted: true,

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();

        const ping = reply.createdTimestamp - interaction.createdTimestamp;


        interaction.editReply({
            content: `Client ping is: ${ping}ms | WS ping:${client.ws.ping}ms`,
            ephemeral:true,
        });
    },
};