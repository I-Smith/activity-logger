const config = require('config.json');
const mongoose = require('mongoose');

const connectionOptions = {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
};

mongoose.connect(config.connectionString, connectionOptions);
// mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);

mongoose.Promise = global.Promise;

module.exports = {
	Challenge: require('challenges/challenge.model'),
	User: require('users/user.model'),
	LogEvent: require('log-events/logEvent.model'),
    RefreshToken: require('users/refresh-token.model'),
    isValidId
};

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}