var mongoose = require('mongoose');
module.exports = mongoose.model("contribution", new mongoose.Schema({
    contributionname: { type: String, required: true },
    contributionpurpose: { type: String, required: true },
    startin: { type: String, required: true },
    deadline: { type: String, required: true },
    amount: { type: Number, required: true },
    level: { type: String, required: true },
    believerinclude: { type: String, required: true, default: "no" },
    affectedgroup: { type: Array, required: false },
    agelimit: { type: Object, required: false },
    churchcode: { type: String, required: false },
    churchname: { type: String, required: false },
    churchid: { type: String, required: false },
    diocode: { type: String, required: true },
    dioname: { type: String, required: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }), "contribution");