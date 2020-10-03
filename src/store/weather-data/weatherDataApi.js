const apiBasePath = 'https://api.darksky.net/forecast';
const apiKey = '50be02525c7c10ea60ccc65ef68147e7';
const coords = '47.1218,-88.5690';


export const getWeatherData = () => {
	const options = {
		method: 'GET',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
	};

	return fetch(
		`${apiBasePath}/${apiKey}/${coords}`,
		options,
	);
}