var mongoose = require('mongoose');
module.exports = mongoose.model("dios", new mongoose.Schema({
    diocode: { type: String, required: true },
    dioname: { type: String, required: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }), "dios"); 