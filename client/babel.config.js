module.exports = (api) => {
	api.cache(true);
	const presets = [
		"@babel/react",
		"@babel/env",
	];
	const plugins = [];
	return {
		presets,
		plugins,
	}
}