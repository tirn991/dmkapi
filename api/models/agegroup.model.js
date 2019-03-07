var mongoose = require('mongoose');
module.exports = mongoose.model("agegroup", new mongoose.Schema({
    agegroupname:{type: String, required: true},
    agefrom: { type: Number, required: true },
    ageto: { type: Number, required: true },
    description: {type: String, required: true}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }), "agegroup"); 