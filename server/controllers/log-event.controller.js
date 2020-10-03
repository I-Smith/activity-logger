const LogEvent = require('../models/log-event.model');

const createLogEvent = (request, response) => {
	const body = request.body;

	if(!body) {
		return response.status(400).json({
			success: false,
			error: 'Request must contain body',
		});
	}

	const logEvent = new LogEvent(body)
	if (!logEvent) {
		return response.status(400).json({ success: false, error: err })
	}

	return logEvent.save().then(() => (
		response.status(201).json({
			success: true,
			id: logEvent._id,
			message: 'Log Event created',
		})
	)).catch((error) => 
		response.status(400).json({
			error,
			message: 'Log Event not created',
		})
	);
};


const updateLogEvent = async (request, response) => {
    const body = request.body

    if (!body) {
        return response.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    LogEvent.findOne({ _id: request.params.id }, (err, logEvent) => {
        if (err) {
            return response.status(404).json({
                err,
                message: 'LogEvent not found!',
            })
        }
        logEvent.date = body.date;
        logEvent.isWorkout = body.isWorkout;
		logEvent.challenge = body.challenge;
		logEvent.activity = body.activity;
        logEvent
            .save()
            .then(() => {
                return response.status(200).json({
                    success: true,
                    id: logEvent._id,
                    message: 'LogEvent updated!',
                })
            })
            .catch(error => {
                return response.status(404).json({
                    error,
                    message: 'LogEvent not updated!',
                })
            })
    })
}

const deleteLogEvent = async (request, response) => {
    await LogEvent.findOneAndDelete({ _id: request.params.id }, (err, logEvent) => {
        if (err) {
            return response.status(400).json({ success: false, error: err })
        }

        if (!logEvent) {
            return response
                .status(404)
                .json({ success: false, error: `LogEvent not found` })
        }

        return response.status(200).json({ success: true, data: logEvent })
    }).catch(err => console.log(err))
}

const getLogEventById = async (request, response) => {
    await LogEvent.findOne({ _id: request.params.id }, (err, logEvent) => {
        if (err) {
            return response.status(400).json({ success: false, error: err })
        }

        if (!logEvent) {
            return response
                .status(404)
                .json({ success: false, error: `LogEvent not found` })
        }
        return response.status(200).json({ success: true, data: logEvent })
    }).catch(err => console.log(err))
}

const getLogEvents = async (request, response) => {
    await LogEvent.find({}, (err, logEvents) => {
        if (err) {
            return response.status(400).json({ success: false, error: err })
        }
        if (!logEvents.length) {
            return response
                .status(404)
                .json({ success: false, error: `LogEvent not found` })
        }
        return response.status(200).json({ success: true, data: logEvents })
    }).catch(err => console.log(err))
}

module.exports = {
	'/log-event': {
		post: createLogEvent,
	},
	'/log-event/:id': {
		put: updateLogEvent,
		delete: deleteLogEvent,
		get: getLogEventById,
	},
	'/log-events': {
		get: getLogEvents
	},
    createLogEvent,
    updateLogEvent,
    deleteLogEvent,
    getLogEvents,
    getLogEventById,
}