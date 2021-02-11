import _ from 'lodash';
import { formatDuration } from './formatDuration';

export const getEventsTotals = (logEvents) => {

	const eventCount = logEvents.length;
	let totalDistance = 0;
	let totalSeconds = 0;
	let totalMinutes = 0;
	let totalHours = 0;
	let totalWeight = 0
	let totalWork = 0;

	_.forEach(logEvents, (event) => {
		const distance = parseFloat(_.get(event, 'activity.distance', 0));
		const seconds = parseFloat(_.get(event, 'activity.duration.seconds', 0));
		const minutes = parseFloat(_.get(event, 'activity.duration.minutes', 0));
		const hours = parseFloat(_.get(event, 'activity.duration.hours', 0));
		const weight = parseFloat(_.get(event, 'activity.ruckWeight', 0)) + parseFloat(_.get(event, 'activity.couponWeight', 0));
		
		totalDistance += distance;
		totalSeconds += seconds;
		totalMinutes += minutes;
		totalHours += hours
		totalWeight += weight;
		totalWork += (weight * distance);
		
	});
	// Format totals
	const formattedDuration = formatDuration(totalHours, totalMinutes, totalSeconds);
	totalDistance = _.round(totalDistance, 2);
	totalWork = _.round(totalWork);

	return {
		eventCount,
		formattedDuration,
		totalDistance,
		totalWeight,
		totalWork,
	}
}

