const {Schema, model} = require('mongoose');

const levelSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    guildId: {
        type: String,
        required: true,
    },
    lastDaily:{
        type:Date,
        required:true,
    },
    balance: {
        type: Number,
        default: 0,
    }
});

module.exports = model('Daily', levelSchema);