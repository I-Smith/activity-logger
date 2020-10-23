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
    if (!db.isValidId(params.accountId)) throw 'Account ID invalid';

    const logEvent = new db.LogEvent(params);

    // save logEvent
	await logEvent.save();
	
	// push logEvent to account.
	const account = await db.Account.findById(params.accountId);
	account.logEvents.push(logEvent)
	await account.save();
	
    return logEvent;
}

async function update(eventId, params) {
    const logEvent = await getLogEvent(eventId);

    if (params.accountId && logEvent.accountId !== params.accountId) {
		// validate
		if (!db.isValidId(params.accountId)) throw 'Account ID invalid';
		// Remove log from old account and add to new
		const newAccount = await db.Account.findById(params.accountId);
		const oldAccount = await db.Account.findById(logEvent.accountId);

		newAccount.logEvents.push(logEvent);
		await newAccount.save();
		oldAccount.logEvents.pull(logEvent);
		await oldAccount.save();
	}
	

    // copy params to logEvent and save
    Object.assign(logEvent, params);
    await logEvent.save();

    return logEvent;
}

async function _delete(eventId) {
	const logEvent = await getLogEvent(eventId);

	// Remove from account
	const oldAccount = await db.Account.findById(logEvent.accountId);
	oldAccount.logEvents.pull(logEvent);
	await oldAccount.save();
	
    await logEvent.remove();
}

// helper functions

async function getLogEvent(eventId) {
    if (!db.isValidId(eventId)) throw 'LogEvent not found';
    const logEvent = await db.LogEvent.findById(eventId);
    if (!logEvent) throw 'LogEvent not found';
    return logEvent;
}
