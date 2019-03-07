var mongoose = require('mongoose');
module.exports = mongoose.model("authentication", new mongoose.Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    status: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }), "authentication");
