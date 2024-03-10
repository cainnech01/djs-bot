const {Client, Guild, Message, ActivityType} = require('discord.js');

/**
 * @param {Client} client
 * @param {Guild} guild
 * @param {Message} message
 * @param {ActivityType} activityType
 */

module.exports = (client, message, activityType) => {
    console.log(`${client.user.tag} is online`);
    //client.users.send('352773734098141204', 'https://tenor.com/view/zxc-gif-27711970'); //1 
//    const targetUser = "352773734098141204";
   
//    const guild = client.guilds.cache.get("1044987435660091433");

//    guild.members.cache.get("933760472174461038").kick();

    client.guilds.cache.forEach((guild) => console.log(guild));

    const temp = client.guilds.fetch();

    console.log(temp);

    client.user.setPresence({ 
        activities: [{ 
            name: 'with depression', 
            type: ActivityType.Custom,
            url: 'https://twitch.tv/lolxd'
        }], 
        status: 'dnd' 
    });
}