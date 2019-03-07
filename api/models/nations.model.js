var mongoose = require('mongoose');
module.exports = mongoose.model("nations", new mongoose.Schema({
    nationname: { type: String, required: true },
    nationvalue: { type: String, required: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }), "nations");
