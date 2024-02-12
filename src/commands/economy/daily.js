const {Client, Interaction} = require('discord.js');
const User = require('../../models/User');

const dailyAmount = 100;

module.exports = {
    
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        if(!interaction.inGuild()) return;

        try {
            await interaction.deferReply();
            
            let query = {
                userId: interaction.member.id,
                guildId: interaction.guild.id,
            };

            let user = await User.findOne(query);

            if(user){
                let lastDaily = user.lastDaily.toDateString();
                let currentDate = new Date().toDateString();

                if(lastDaily == currentDate){
                    interaction.editReply("No time yet");
                    return;
                }

                user.lastDaily = new Date();
            }
            else{
                let user = new User({
                    ...query,
                    lastDaily: new Date(),
                });
            }

            user.balance += dailyAmount;
            user.save();

            interaction.editReply(`Ежедневная награда зачислена, ваш текущий баланс: ${user.balance}`);
        } catch (error) {
            console.log(`ERROR daily ${error}`)            
        }
    },
    
    name: 'daily',
    description: 'daily xp',
};