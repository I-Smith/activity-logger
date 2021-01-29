const db = require('_helpers/db');

module.exports = {
    getAll,
	getById,
	getReport,
    create,
    update,
	delete: _delete,
};

async function getAll() {
    const challenges = await db.Challenge.find();
    return challenges;
}

async function getById(challengeId) {
    const challenge = await getChallenge(challengeId);
    return challenge;
}

async function getReport(challengeId) {
	const challenge = await getChallenge(challengeId);
	const rawUsers = await db.User.find().populate({
		path: 'logEvents',
		match: { 
			challenge: challengeId
		}
	}).exec();
	const users = rawUsers.map((user) => userDetails(user));

	return {
		challenge,
		users,
	};
}

async function create(params) {
    const challenge = new db.Challenge(params);
    // save challenge
	await challenge.save();	
    return challenge;
}

async function update(challengeId, params) {
    const challenge = await getChallenge(challengeId);

    // copy params to challenge and save
    Object.assign(challenge, params);
    await challenge.save();

    return challenge;
}

//
async function _delete(challengeId) {

	const challenge = await getChallenge(challengeId);
	
    await challenge.remove();
}

// helper functions

async function getChallenge(challengeId) {
    if (!db.isValidId(challengeId)) throw 'Challenge not found';
    const challenge = await db.Challenge.findById(challengeId);
    if (!challenge) throw 'Challenge not found';
    return challenge;
}

async function getUserChallengeEvents(userId, challengeId) {
	const { firstName, lastName, email, logEvents } = await db.User.findById(userId).populate({
		path: 'logEvents',
		match: { 
			challenge: challengeId
		}
	}).exec();
	
	return {
		firstName,
		lastName,
		email,
		// challengeEvents: logEvents.filter((event) => event.challenge === challengeId),
		challengeEvents: logEvents,
	};
}
function userDetails(user) {
    const { id, firstName, lastName, email, logEvents } = user;
    return { id, firstName, lastName, email, logEvents };
}