import _ from 'lodash';

export const formatDuration = (hours, minutes, seconds) => {
	const totalMinutes = minutes + _.floor(seconds / 60);

	const finalHours = hours + _.floor(totalMinutes / 60);
	const finalMinutes = totalMinutes % 60;
	const finalSeconds = seconds % 60;

	// Format totals
	const formattedSeconds = String(_.floor(finalSeconds) || '00').padStart(2, '0');
	const formattedMinutes = String(_.floor(finalMinutes) || '00').padStart(2, '0');
	const formattedHours = String(_.floor(finalHours) || '00').padStart(2, '0');

	return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

