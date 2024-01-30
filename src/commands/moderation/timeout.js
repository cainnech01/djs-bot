const {Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, ApplicationCommandType} = require('discord.js');
const ms = require('ms');
module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     * @param {PermissionFlagsBits} permission
     */

    callback: async (client, interaction) => {
        const mentionable = interaction.options.get('target-user').value;
        const duration = interaction.options.get('duration').value;
        const reason = interaction.options.get('reason')?.value || 'No reason';

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(mentionable);

        if(!targetUser){
            await interaction.editReply("Thar user doesn't exist in this server");
            return;
        }

        if(targetUser.user.bot){
            await interaction.editReply("I can't do that");
        }

        const msDuration = ms(duration);
        console.log(msDuration);

        if(isNaN(msDuration)){
            await interaction.editReply("Please provide a valid timeout duration");
            return;
        }

        // if(msDuration < 5000 || msDuration > 2,506e+9){
        //     await interaction.editReply("Timeout duration cannot be less than 5 secs or more than 29 days");
        //     return;
        // }

        const botRolePos = interaction.guild.members.me.roles.highest.position;
        const requestUserRolePos = interaction.member.roles.highest.position;
        const targetUserRolePos = targetUser.roles.highest.position;

        if(targetUserRolePos >= botRolePos){
            await interaction.editReply("I can't timeout the user with the highest/same role");
            return;
        }


        if(targetUserRolePos >= requestUserRolePos){
            await interaction.editReply("I can't timeout the user with the same or high role than you");
            return;
        }


        try {
            const {default: prettyMs} = await import('pretty-ms');
            

            if(targetUser.isCommunicationDisabled()){
                await targetUser.timeout(msDuration, reason);
                await interaction.editReply(`${targetUser} timeout has been updated to ${prettyMs(msDuration, { verbose: true})}.\nReason: ${reason}`);
                return;
            }

            await targetUser.timeout(msDuration, reason);
            await interaction.editReply(`${targetUser} was time out for ${prettyMs(msDuration, { verbose: true})}.\nReason: ${reason}`);
            
        } catch (error) {
            console.log(`ERROR ${error}`);
        }
    },

    name: 'timeout',
    description: 'timeout user',
    // devOnly: Boolean,
    // testOnly: Boolean,
    options: [
        {
            name: 'target-user',
            description: 'WHOOOOOOOO',
            required: true,
            type: ApplicationCommandOptionType.Mentionable
        },
        {
            name: 'duration',
            description: '30m, 1h,1d',
            required: true, 
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'reason',
            description: 'The reason is simply',
            required: true,
            type: ApplicationCommandOptionType.String
        }
    ],
    permissionsRequired: [PermissionFlagsBits.KickMembers],
    botPermissions: [PermissionFlagsBits.KickMembers],
};