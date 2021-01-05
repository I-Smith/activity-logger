const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	name: { type: String, required: true },
	startDate: { type: String, required: true },
	endDate: {type: String, required: true },
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
    }
});

module.exports = mongoose.model('Challenge', schema);