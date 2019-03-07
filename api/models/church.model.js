var mongoose = require('mongoose');
module.exports = mongoose.model("church", new mongoose.Schema({
    churchcode: { type: String, required: true },
    churchname: { type: String, required: true },
    churchlocation: { type: String, required: true },
    diocode: { type: String, required: true },
    dioname: { type: String, required: true },
    churchleader:{ type:Object, required:true}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }), "church"); 