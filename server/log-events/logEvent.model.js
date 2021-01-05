const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userId: { type: String },
	date: { type: String, required: true },
	isWorkout: { type: Boolean, default: false },
	challenge: { type: String },
	activity: {
		duration: {
			hours: { type: String },
			minutes: { type: String },
			seconds: { type: String },
		},
		distance: { type: Number },
		couponWeight: { type: Number },
		ruckWeight: { type: Number },
		notes: { type: String },
		// extra fields to come
	},
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
    }
});

module.exports = mongoose.model('LogEvent', schema);