import _ from 'lodash';

export const getEventsTotals = (logEvents) => {

	const eventCount = logEvents.length;
	let totalDistance = 0;
	let totalSeconds = 0;
	let totalMinutes = 0;
	let totalHours = 0;
	let totalDuration = 0;
	let totalWeight = 0
	let totalWork = 0;

	_.forEach(logEvents, (event) => {
		const distance = parseFloat(_.get(event, 'activity.distance', 0));
		const seconds = parseFloat(_.get(event, 'activity.duration.seconds', 0));
		const minutes = parseFloat(_.get(event, 'activity.duration.minutes', 0)) + (seconds / 60);
		const hours = parseFloat(_.get(event, 'activity.duration.hours', 0)) + (minutes / 60);
		const weight = parseFloat(_.get(event, 'activity.ruckWeight', 0)) + parseFloat(_.get(event, 'activity.couponWeight', 0));
		
		totalDistance += distance;
		totalSeconds += seconds;
		totalMinutes += minutes;
		totalHours += hours
		totalDuration += (hours + ((minutes + (seconds / 60)) / 60));
		totalWeight += weight;
		totalWork += (4.44 * weight * distance);
		
	});
	totalDistance = _.round(totalDistance, 2);
	totalSeconds = String(_.round(totalSeconds) || '00').padStart(2, '0')
	totalMinutes = String(_.round(totalMinutes) || '00').padStart(2, '0')
	totalHours = String(_.round(totalHours) || '00').padStart(2, '0')
	totalDuration = _.round(totalDuration, 2);
	totalWork = _.round(totalWork);

	return {
		eventCount,
		totalDistance,
		totalSeconds,
		totalMinutes,
		totalHours,
		totalDuration,
		totalWeight,
		totalWork,
	}
}

