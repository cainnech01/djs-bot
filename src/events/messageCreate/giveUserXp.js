const {Client, Message} = require('discord.js');
const Level = require('../../models/Level');
const calculateXp = require('../../utils/calculateXp')
const cooldowns = new Set();

function getRandomXp(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min+1)) + min;
}

/**
 * 
 * @param {Client} client
 * @param {Message} msg 
 */

module.exports = async (client, msg) => {
    if(!msg.inGuild() || msg.author.bot || cooldowns.has(msg.author.id)) return;
    
    const xpToGive = getRandomXp(5, 15);

    const query = {
        userId: msg.author.id,
        guildId: msg.guild.id,
    };

    try {
        const level = await Level.findOne(query);

        if(level){
            level.xp += xpToGive;

            if(level.xp > calculateXp(level.level)){
                level.xp = 0;
                level.level += 1;

                msg.channel.send(`${msg.member} level up to ${level.level}`)
            }

            await level.save().catch((e) => {
                console.log(`Error saving upd lvl ${e}`)
                return;
            });

            cooldowns.add(msg.author.id);
            setTimeout(() => {
                cooldowns.delete(msg.author.id);
            }, 60000);
        }

        else{
            const newLevel = new Level({
                userId: msg.author.id,
                guildId: msg.guild.id,
                xp: xpToGive,
            });

            await newLevel.save();

            cooldowns.add(msg.author.id);
            setTimeout(() => {
                cooldowns.delete(msg.author.id);
            }, 60000);
        }
    } catch (error) {
        console.log(`error with xp:  ${error}`);
    }
}