const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogEvent = new Schema(
	{
		date: { type: Date, required: true },
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
			extra: { type: String },
		},
	},
);

module.exports = mongoose.model('logEvents', LogEvent);