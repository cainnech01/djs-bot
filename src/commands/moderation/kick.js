const {Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     * @param {PermissionFlagsBits} permission
     */

    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('target-user').value;
        const reason = interaction.options.get('reason')?.value || "No reason";

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(targetUserId);

        if(!targetUser){
            await interaction.editReply("User doesn't exist in this server");
            return;
        }

        if(targetUser.id === interaction.guild.ownerId){
            await interaction.editReply("You can't kick that user because they're the server owner.");
            return;
        }

        const botRolePos = interaction.guild.members.me.roles.highest.position;
        const requestUserRolePos = interaction.member.roles.highest.position;
        const targetUserRolePos = targetUser.roles.highest.position;

        if(targetUserRolePos >= botRolePos){
            await interaction.editReply("I can't kick the user with the highest/same role");
            return;
        }

        if(targetUserRolePos >= requestUserRolePos){
            await interaction.editReply("I can't kick the user with the same or high role than you");
            return;
        }

        try {
            await targetUser.kick({reason});
            await interaction.editReply(`User ${targetUser} was kicked\nReason: ${reason}`);
        } catch (error) {
            console.log(`There was an error when kick: ${error}`);
        }
    },

    name: 'kick',
    description: 'kick user',
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
            name: 'reason',
            description: 'The reason is simply',
            required: true,
            type: ApplicationCommandOptionType.String
        }
    ],
    permissionsRequired: [PermissionFlagsBits.KickMembers],
    botPermissions: [PermissionFlagsBits.KickMembers],
};