const { getWrapper } = require('./wrapper.email');

module.exports = {
	getAlreadyRegisteredHtml,
	getApprovalHtml,
	getPasswordReCtrlsetHtml,
	getVerificationHtml,
}

function getVerificationHtml(user, origin){
	const messageHtml = `
	<h2>Thanks for Registering, ${user.firstName}!</h2>
	<br>
	<h4>
		Just head over and <a href="${origin}/verify?token=${user.verificationToken}">verify your email</a>.
		An admin will review your account and you'll receive another email once your account has been approved.
	</h4>`;

	return getWrapper(messageHtml);
}

function getAlreadyRegisteredHtml(email, origin){
	const messageHtml = `
	<h2>Whoa there!</h2>
	<br>
	<h4>While we appreciate the enthusiasm, it looks like ${email} is already registered!</h4>
	<br>
	<h4>Go ahead and<a href="${origin}/login">log in</a>.</h4>
	<h5>If you've forgotten your password, go ahead and <a href="${origin}/forgot-password">change it</a>.</h5>`;

	return getWrapper(messageHtml);
}

function getApprovalHtml(user, origin) {
	const messageHtml = `
	<h2>Good news, ${user.firstName}!</h2>
	<br>
	<h4>
		Your account has been approved. You can head over and <a href="${origin}/login">log in</a>.
	</h4>`;

	return getWrapper(messageHtml);
}

function getPasswordReCtrlsetHtml(user, origin){
	const messageHtml = `
	<h2>Hey there, ${user.firstName}!</h2>
	<br>
	<h4>You're all set to <a href="${origin}/reset-password?token=${user.resetToken.token}">reset your password</a> and get back in action!</h4>`;

	return getWrapper(messageHtml);
}