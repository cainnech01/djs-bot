const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    AttachmentBuilder,
  } = require('discord.js');
 
//const canvacord = require('canvacord');
const calculateLevelXp = require('../../utils/calculateXp');
const Level = require('../../models/Level');  
const { RankCardBuilder, Font } = require('canvacord');

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction
     * @param {RankCardBuilder} RankCardBuilder 
     * @returns 
     */
    callback: async (client, interaction) => {

        Font.loadDefault();
        //const {default: RankCardBuilder} = await import('canvacord');
        if (!interaction.inGuild()) {
          interaction.reply('You can only run this command inside a server.');
          return;
        }
    
        await interaction.deferReply();
    
        const mentionedUserId = interaction.options.get('target-user')?.value;
        const targetUserId = mentionedUserId || interaction.member.id;
        const targetUserObj = await interaction.guild.members.fetch(targetUserId);
    
        const fetchedLevel = await Level.findOne({
          userId: targetUserId,
          guildId: interaction.guild.id,
        });
    
        if (!fetchedLevel) {
          interaction.editReply(
            mentionedUserId
              ? `${targetUserObj.user.tag} doesn't have any levels yet. Try again when they chat a little more.`
              : "You don't have any levels yet. Chat a little more and try again."
          );
          return;
        }
    
        let allLevels = await Level.find({ guildId: interaction.guild.id }).select(
          '-_id userId level xp'
        );
    
        allLevels.sort((a, b) => {
          if (a.level === b.level) {
            return b.xp - a.xp;
          } else {
            return b.level - a.level;
          }
        });
    
        let currentRank = allLevels.findIndex((lvl) => lvl.userId === targetUserId) + 1;
        const card = new RankCardBuilder()
            .setDisplayName(targetUserObj.user.username)
            //.setUsername(targetUserObj.user.username)
            .setAvatar(targetUserObj.user.displayAvatarURL({ size: 256 }))
            .setCurrentXP(fetchedLevel.xp)
            .setRequiredXP(calculateLevelXp(fetchedLevel.level))
            .setProgressCalculator(() => {
            return Math.floor(Math.random() * 100);
            })
            .setLevel(fetchedLevel.level)
            .setRank(currentRank)
            .setOverlay(90)
            .setBackground("#23272a")
            .setStatus(targetUserObj.presence.status);

        const data = await card.build();
        const attachment = new AttachmentBuilder(data);
        interaction.editReply({ files: [attachment] });
      },
  
    name: 'level_test',
    description: "Show your/someone's level.",
    options: [
      {
        name: 'target-user',
        description: 'The user whose level you want to see.',
        type: ApplicationCommandOptionType.Mentionable,
      },
    ],
  };