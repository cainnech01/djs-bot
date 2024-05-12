require('dotenv').config();
const {Client, IntentsBitField, EmbedBuilder, Activity, ActivityType } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');
const mongoose = require('mongoose');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.GuildPresences,
    ],
});

(async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to DB");
    
        eventHandler(client);

        client.login(process.env.TOKEN);
    } catch (error) {
        console.log(`ERROR ${error}`);
    }
})();



