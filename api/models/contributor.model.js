var mongoose = require('mongoose');
module.exports = mongoose.model("contributor", new mongoose.Schema({
    name: { type: String, required: true },
    believerid: { type: String, required: true },
    phonenumber: { type: String, required: true },
    contributionid: { type: String, required: true },
    contributionamount: { type: Number, required: true },
    cellgroup: { type: Object, required: true },
    church: { type: Object, required: true },
    diocese: { type: Object, required: true },
    amount: { type: Number, required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }), "contributor");