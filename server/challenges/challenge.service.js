const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
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
