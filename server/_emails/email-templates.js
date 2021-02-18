const { getWrapper } = require('./wrapper.email');

module.exports = {
	getAlreadyRegisteredHtml,
	getApprovalHtml,
	getDenialHtml,
	getLockHtml,
	getPasswordResetHtml,
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
	<h4>Go ahead and <a href="${origin}/login">log in</a>.</h4>
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

function getPasswordResetHtml(user, origin){
	const messageHtml = `
	<h2>Hey there, ${user.firstName}!</h2>
	<br>
	<h4>You're all set to <a href="${origin}/reset-password?token=${user.resetToken.token}">reset your password</a> and get back in action!</h4>`;

	return getWrapper(messageHtml);
}

function getDenialHtml(user, origin) {
	const messageHtml = `
	<h2>Hi, ${user.firstName}.</h2>
	<br>
	<h4>
		Your account access has been denied.
	</h4>
	<h4>
		We only allow access to the activity tracker when/if you register for an event.
		<br>
		If you believe that you were denied access by mistake, please contact us via <a href="mailto:info@rucksonparade.com">info@rucksonparade.com</a>.
	</h4>`;

	return getWrapper(messageHtml);
}

function getLockHtml(user, origin) {
	const messageHtml = `
	<h2>Hi, ${user.firstName}.</h2>
	<br>
	<h4>
		Your account access has been locked.
	</h4>
	<h4>
		We only allow access to the activity tracker when/if you register for an event.
		<br>
		If you believe that your account was locked by mistake, please contact us via <a href="mailto:info@rucksonparade.com">info@rucksonparade.com</a>.
	</h4>`;

	return getWrapper(messageHtml);
}