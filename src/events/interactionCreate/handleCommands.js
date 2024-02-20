const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    AttachmentBuilder,
  } = require('discord.js');
const {devs, testServer} = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client,interaction) => {

    /**
     * @param {GuildMember} GuildMember
     * @param {Interaction} interaction
     */

    if(!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find(
            (cmd) => cmd.name === interaction.commandName
        );
        
        console.log(`${commandObject.name} by ${interaction.user.globalName}`);

        if(!commandObject) return;

        if(commandObject.devOnly){
            if(!devs.includes(interaction.member.id)){
                interaction.reply({
                    content: 'Only for devs',
                    ephemeral: true,
                });
                return;
            }
        }

        if(commandObject.testOnly){
            if(interaction.guild.id === testServer){
                interaction.reply({
                    content: 'This command cannot be ran here',
                    ephemeral: true,
                });
            }
            return;
        }

        if(commandObject.permissionsRequired?.length){
            for(const permission of commandObject.permissionsRequired){
                console.log(commandObject.permissionsRequired);
                if(!interaction.member.permissions.has(permission)){
                    interaction.reply({
                        content: 'Not enough permissions.',
                        ephemeral: true,
                    });
                    return;
                }
            }
        }

        if(commandObject.botPermissions?.length){

            for(const permission of commandObject.botPermissions){
                const bot = interaction.guild.members.me;

                if(!bot.permissions.has(permission)){
                    interaction.reply({
                        content:"I dont have enough permissions.",
                        ephemeral: true,
                    });
                    return;
                }
            }
        }
        
        await commandObject.callback(client,interaction);



    } catch (error) {
        console.log(`error handling command: ${error}`)
    }
}