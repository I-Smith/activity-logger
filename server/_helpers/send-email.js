const nodemailer = require('nodemailer');
const config = require('config.json');

module.exports = sendEmail;

async function sendEmail({ to, subject, html, from = config.emailFrom }) {
    const transporter = nodemailer.createTransport(config.smtpOptions);
    await transporter.sendMail({
		from,
		to,
		subject,
		html,
		attachments: [{
			filename: 'RUCKS ON PARADE logo.png',
			path: __dirname +'/RUCKS ON PARADE logo.png',
			cid: 'RucksOnParadeLogo'
		}, {
			filename: 'RUCKS ON PARADE-logo-white.png',
			path: __dirname +'/RUCKS ON PARADE-logo-white.png',
			cid: 'RucksOnParadeLogo-white'
		}]
	});
}