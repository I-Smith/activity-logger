const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const sendEmail = require('_helpers/send-email');
const db = require('_helpers/db');
const Role = require('_helpers/role');
const {
	getAlreadyRegisteredHtml,
	getApprovalHtml,
	getPasswordReCtrlsetHtml,
	getVerificationHtml,
} = require('../_emails/email-templates');

module.exports = {
    authenticate,
    refreshToken,
    revokeToken,
    register,
    verifyEmail,
    forgotPassword,
    validateResetToken,
    resetPassword,
	getAll,
	getUnapproved,
    getById,
    create,
    update,
	delete: _delete,
	getLogEvents,
};

async function authenticate({ email, password, ipAddress }) {
    const user = await db.User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
        throw 'Email or password is incorrect';
	}
	if (!user.isVerified) throw 'Please verify your account before logging in';
	if (!user.approved) throw 'An admin must approve your account before you can log in';

    // authentication successful so generate jwt and refresh tokens
    const token = generateJwtToken(user);
    const refreshToken = generateRefreshToken(user, ipAddress);

    // save refresh token
    await refreshToken.save();

    // return basic details and tokens
    return {
        ...basicDetails(user),
        token,
        refreshToken: refreshToken.token
    };
}

async function refreshToken({ token, ipAddress }) {
    const refreshToken = await getRefreshToken(token);
    const { user } = refreshToken;

    // replace old refresh token with a new one and save
    const newRefreshToken = generateRefreshToken(user, ipAddress);
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    refreshToken.replacedByToken = newRefreshToken.token;
    await refreshToken.save();
    await newRefreshToken.save();

    // generate new jwt
    const jwtToken = generateJwtToken(user);

    // return basic details and tokens
    return {
        ...basicDetails(user),
        token: jwtToken,
        refreshToken: newRefreshToken.token
    };
}

async function revokeToken({ token, ipAddress }) {
    const refreshToken = await getRefreshToken(token);

    // revoke token and save
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    await refreshToken.save();
}

async function register(params, origin) {
    // validate
    if (await db.User.findOne({ email: params.email })) {
        // send already registered error in email to prevent user enumeration
        return await sendAlreadyRegisteredEmail(params.email, origin);
    }

    // create user object
    const user = new db.User(params);

    // first registered user is an admin
    const isFirstUser = (await db.User.countDocuments({})) === 0;
    user.role = isFirstUser ? Role.Admin : Role.User;
    user.verificationToken = randomTokenString();

    // hash password
    user.passwordHash = hash(params.password);

    // save user
    await user.save();

    // send email
    await sendVerificationEmail(user, origin);
}

async function verifyEmail({ token }) {
    const user = await db.User.findOne({ verificationToken: token });

    if (!user) throw 'Verification failed';
	if (user.verified) throw 'This email has already been verified';

    user.verified = Date.now();
	await user.save();
	return user.approved;
}

async function forgotPassword({ email }, origin) {
    const user = await db.User.findOne({ email });

    // always return ok response to prevent email enumeration
    if (!user) return;

    // create reset token that expires after 24 hours
    user.resetToken = {
        token: randomTokenString(),
        expires: new Date(Date.now() + 24*60*60*1000)
    };
    await user.save();

    // send email
    await sendPasswordResetEmail(user, origin);
}

async function validateResetToken({ token }) {
    const user = await db.User.findOne({
        'resetToken.token': token,
        'resetToken.expires': { $gt: Date.now() }
    });

    if (!user) throw 'Invalid token';
}

async function resetPassword({ token, password }) {
    const user = await db.User.findOne({
        'resetToken.token': token,
        'resetToken.expires': { $gt: Date.now() }
    });

    if (!user) throw 'Invalid token';

    // update password and remove reset token
    user.passwordHash = hash(password);
    user.passwordReset = Date.now();
    user.resetToken = undefined;
    await user.save();
}

async function getAll() {
    const users = await db.User.find();
    return users.map(x => basicDetails(x));
}

async function getUnapproved() {
    const users = await db.User.find({ approved: { $ne: true } });
    return users.map(x => basicDetails(x));
}

async function getById(userId) {
    const user = await getUser(userId);
    return basicDetails(user);
}

async function create(params) {
    // validate
    if (await db.User.findOne({ email: params.email })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    const user = new db.User(params);
    user.verified = Date.now();

    // hash password
    user.passwordHash = hash(params.password);

    // save user
    await user.save();

    return basicDetails(user);
}

async function update(userId, params, origin) {
	const user = await getUser(userId);
	
	if (!user) throw "Invalid user";

    // validate (if email was changed)
    if (params.email && user.email !== params.email && await db.User.findOne({ email: params.email })) {
        throw 'Email "' + params.email + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.passwordHash = hash(params.password);
	}

    // copy params to user and save
    Object.assign(user, params);
    user.updated = Date.now();
	await user.save();
	
	if (params.approved) {
		await sendApprovalEmail(user, origin);
	}

    return basicDetails(user);
}

async function _delete(userId) {
    const user = await getUser(userId);
    await user.remove();
}

async function getLogEvents(userId) {
    const user = await getUserWithLogs(userId);
    return logEventsDetails(user);
}

// helper functions

async function getUser(userId) {
    if (!db.isValidId(userId)) throw 'User not found';
    const user = await db.User.findById(userId);
    if (!user) throw 'User not found';
    return user;
}

async function getUserWithLogs(userId) {
    if (!db.isValidId(userId)) throw 'User not found';
    const user = await db.User.findById(userId).populate('logEvents');
    if (!user) throw 'User not found';
    return user;
}

async function getRefreshToken(token) {
    const refreshToken = await db.RefreshToken.findOne({ token }).populate('user');
    if (!refreshToken || !refreshToken.isActive) throw 'Invalid token';
    return refreshToken;
}

function hash(password) {
    return bcrypt.hashSync(password, 10);
}

function generateJwtToken(user) {
    // create a jwt token containing the user id that expires in 15 minutes
    return jwt.sign({ sub: user.id, id: user.id }, config.secret, { expiresIn: '30m' });
}

function generateRefreshToken(user, ipAddress) {
    // create a refresh token that expires in 7 days
    return new db.RefreshToken({
        user: user.id,
        token: randomTokenString(),
        expires: new Date(Date.now() + 7*24*60*60*1000),
        createdByIp: ipAddress
    });
}

function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
}

function basicDetails(user) {
    const { id, firstName, lastName, email, role, created, updated, isVerified, approved } = user;
    return { id, firstName, lastName, email, role, created, updated, isVerified, approved };
}

function logEventsDetails(user) {
    const { id, email, logEvents } = user;
    return { id, email, logEvents };
}

async function sendVerificationEmail(user, origin) {
    await sendEmail({
        to: user.email,
        subject: 'Activity Log - Verify Email',
        html: getVerificationHtml(user, origin),
    });
}

async function sendApprovalEmail(user, origin) {
	await sendEmail({
        to: user.email,
        subject: 'Activity Log - Approved!',
        html: getApprovalHtml(user, origin),
    });
}

async function sendAlreadyRegisteredEmail(email, origin) {
    await sendEmail({
        to: email,
        subject: 'Activity Log - Email Already Registered',
        html: getAlreadyRegisteredHtml(email, origin),
    });
}

async function sendPasswordResetEmail(user, origin) {
   await sendEmail({
        to: user.email,
        subject: 'Sign-up Verification API - Reset Password',
        html: getPasswordReCtrlsetHtml(user, origin),
    });
}