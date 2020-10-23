const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
	delete: _delete,
};

async function getAll(accountId) {
    const { id, email, logEvents } = await getAccount(accountId);
    return { id, email, logEvents };
}

async function getById(accountId, eventId) {
    const logEvent = await getAccountLogEvent(accountId, eventId);

    return logEvent;
}

async function create(accountId, params) {
    // validate
    if (!db.isValidId(accountId)) throw 'Account ID invalid';

    const account = await db.Account.findById(accountId);
    
    const logEvent = new db.LogEvent(params);
    logEvent.accountId = accountId;
    // save logEvent
	await logEvent.save();
	
	// push logEvent to account.
	
	account.logEvents.push(logEvent)
	await account.save();
	
    return logEvent;
}

async function update(accountId, eventId, params) {
    const logEvent = await getAccountLogEvent(accountId, eventId);

    // copy params to logEvent and save
    console.log(`before\n${logEvent}`);
    Object.assign(logEvent, params);
    console.log(`after\n${logEvent}`);
    await logEvent.save();

    return logEvent;
}

async function _delete(accountId, eventId) {
	const logEvent = await getAccountLogEvent(accountId, eventId);

	// Remove from account
	const oldAccount = await db.Account.findById(accountId);
	oldAccount.logEvents.pull(logEvent);
	await oldAccount.save();
	
    await logEvent.remove();
}

// helper functions

async function getAccount(accountId) {
    if (!db.isValidId(accountId)) throw 'Account not found';
    const account = await db.Account.findById(accountId).populate('logEvents');
    if (!account) throw 'Account not found';
    return account;
}

async function getAccountLogEvent(accountId, eventId) {
    if (!db.isValidId(accountId)) throw 'Account not found';
    if (!db.isValidId(eventId)) throw 'LogEvent not found';

    const logEvent = await db.LogEvent.findById(eventId);
    if (!logEvent || logEvent.accountId !== accountId) throw 'LogEvent not found';
    return logEvent;
}
