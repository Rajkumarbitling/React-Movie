const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
const ListSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    type: { type: String },
    genre: { type: String },
    content: [{ type : ObjectId, ref: 'Movie' }],
}, { timestamps: true })

module.exports = mongoose.model('List', ListSchema);