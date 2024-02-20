const {Client, Interaction, ApplicationCommandOptionType} = require('discord.js');
const User = require('../../models/User');

module.exports = {
    
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        if(!interaction.inGuild()) return;

        try {
            const targetUserId = interaction.options.get('target-user')?.value || interaction.member.id;
            await interaction.deferReply();
            
            const user = await User.findOne({userId: targetUserId, guildId: interaction.guild.id});

            if(!user){
                interaction.editReply(`<@${targetUserId}> не записан в долбаебах`);
                return;
            }

            interaction.editReply(
                targetUserId === interaction.member.id ?
                `Ваш баланс: ${user.balance} emo girls` :
                `Баланс <@${targetUserId}>: ${user.balance} emo girls`
            );

        } catch (error) {
            console.log(`error balance:  ${error}`)            
        }
    },
    
    name: 'balance',
    description: 'Узнать свой/чей-то баланс',
    options: [
        {
            name: 'target-user',
            description: 'ПОХУЙ + похуй, да хоть минус похуй',
            type: ApplicationCommandOptionType.Mentionable,
        },
    ],
};