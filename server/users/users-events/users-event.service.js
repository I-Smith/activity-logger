const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
	delete: _delete,
};

async function getAll(userId) {
    const { id, email, logEvents } = await getUser(userId);
    return { id, email, logEvents };
}

async function getById(userId, eventId) {
    const logEvent = await getUserLogEvent(userId, eventId);

    return logEvent;
}

async function create(userId, params) {
    // validate
    if (!db.isValidId(userId)) throw 'User ID invalid';

    const user = await db.User.findById(userId);
    
    const logEvent = new db.LogEvent(params);
    logEvent.userId = userId;
    // save logEvent
	await logEvent.save();
	
	// push logEvent to user.
	
	user.logEvents.push(logEvent)
	await user.save();
	
    return logEvent;
}

async function update(userId, eventId, params) {
    const logEvent = await getUserLogEvent(userId, eventId);

    // copy params to logEvent and save
    console.log(`before\n${logEvent}`);
    Object.assign(logEvent, params);
    console.log(`after\n${logEvent}`);
    await logEvent.save();

    return logEvent;
}

async function _delete(userId, eventId) {
	const logEvent = await getUserLogEvent(userId, eventId);

	// Remove from user
	const oldUser = await db.User.findById(userId);
	oldUser.logEvents.pull(logEvent);
	await oldUser.save();
	
    await logEvent.remove();
}

// helper functions

async function getUser(userId) {
    if (!db.isValidId(userId)) throw 'User not found';
    const user = await db.User.findById(userId).populate('logEvents');
    if (!user) throw 'User not found';
    return user;
}

async function getUserLogEvent(userId, eventId) {
    if (!db.isValidId(userId)) throw 'User not found';
    if (!db.isValidId(eventId)) throw 'LogEvent not found';

    const logEvent = await db.LogEvent.findById(eventId);
    if (!logEvent || logEvent.userId !== userId) throw 'LogEvent not found';
    return logEvent;
}
