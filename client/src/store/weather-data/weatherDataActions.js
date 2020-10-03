import { getWeatherData } from './weatherDataApi';
import {
	LOAD_WEATHER_DATA,
	LOAD_WEATHER_DATA_RESPONSE,
} from '../actionTypes';

export const loadWeatherDataReponse = ({ body, status, error }) => (dispatch) => (
	dispatch({
		type: LOAD_WEATHER_DATA_RESPONSE,
		payload: {
			body,
			status,
			error,
		},
	})
);

export const loadWeatherData = () => (dispatch) => {
	dispatch({
		type: LOAD_WEATHER_DATA,
	});
	return getWeatherData()
		.then((response) => (loadWeatherDataReponse(response)))
};