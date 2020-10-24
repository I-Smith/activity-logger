const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
	delete: _delete,
};

async function getAll() {
    const logEvents = await db.LogEvent.find();
    return logEvents;
}

async function getById(eventId) {
    const logEvent = await getLogEvent(eventId);
    return logEvent;
}

async function create(params) {
    // validate
    if (!db.isValidId(params.userId)) throw 'User ID invalid';

    const logEvent = new db.LogEvent(params);

    // save logEvent
	await logEvent.save();
	
	// push logEvent to user.
	const user = await db.User.findById(params.userId);
	user.logEvents.push(logEvent)
	await user.save();
	
    return logEvent;
}

async function update(eventId, params) {
    const logEvent = await getLogEvent(eventId);

    if (params.userId && logEvent.userId !== params.userId) {
		// validate
		if (!db.isValidId(params.userId)) throw 'User ID invalid';
		// Remove log from old user and add to new
		const newUser = await db.User.findById(params.userId);
		const oldUser = await db.User.findById(logEvent.userId);

		newUser.logEvents.push(logEvent);
		await newUser.save();
		oldUser.logEvents.pull(logEvent);
		await oldUser.save();
	}
	

    // copy params to logEvent and save
    Object.assign(logEvent, params);
    await logEvent.save();

    return logEvent;
}

async function _delete(eventId) {
	const logEvent = await getLogEvent(eventId);

	// Remove from user
	const oldUser = await db.User.findById(logEvent.userId);
	oldUser.logEvents.pull(logEvent);
	await oldUser.save();
	
    await logEvent.remove();
}

// helper functions

async function getLogEvent(eventId) {
    if (!db.isValidId(eventId)) throw 'LogEvent not found';
    const logEvent = await db.LogEvent.findById(eventId);
    if (!logEvent) throw 'LogEvent not found';
    return logEvent;
}
