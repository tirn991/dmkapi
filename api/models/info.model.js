var mongoose = require('mongoose');
module.exports = mongoose.model("info", new mongoose.Schema({
    infotitle:{type: String, required: true},
    groupcode: { type: String, required: true },
    agefrom: { type: Number, required: true },
    ageto: { type: Number, required: true},
    body: { type: String, required: true },
    valid: {type: Number, default: 0}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }), "info"); 