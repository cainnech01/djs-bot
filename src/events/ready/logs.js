const {Client} = require('discord.js');

/**
 * @param {Client} client
 */

module.exports = (client) => {
    const targetUser = "473511813242159104";
    console.log(`${client.user.tag} is online`);
    //client.users.send('927285381207040070 ', 'https://tenor.com/view/zxc-gif-27711970');
    targetUser.ban();
}