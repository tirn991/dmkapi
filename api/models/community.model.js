var mongoose = require('mongoose');
module.exports = mongoose.model("community", new mongoose.Schema({
    communitycode: { type: String, required: true },
    communityname: { type: String, required: true },
    communitylocation: { type: String, required: true },
    churchcode: { type: String, required: true },
    churchname: { type: String, required: true },
    churchid: { type: String, required: true },
    diocode: { type: String, required: true },
    dioname: { type: String, required: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }), "community");