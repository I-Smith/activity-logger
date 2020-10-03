import _ from 'lodash';

const getWeatherDataStore = (store) => store.weatherDataStore;

const getCurrently = (store) => _.defaultTo(_.get(getWeatherDataStore(store), 'details.currently'), {});

export const getTime = (store) => _.defaultTo(_.get(getCurrently(store), 'time'), '');
export const getCurrentSummary = (store) => _.defaultTo(_.get(getCurrently(store), 'summary'), '');
export const getCurrentPrecipIntensity = (store) => _.defaultTo(_.get(getCurrently(store), 'precipIntensity'), '');
export const getCurrentPrecipProbability = (store) => _.defaultTo(_.get(getCurrently(store), 'precipProbability'), '');
export const getCurrentPrecipType = (store) => _.defaultTo(_.get(getCurrently(store), 'preicipType'), '');
export const getCurrentTemp = (store) => _.defaultTo(_.get(getCurrently(store), 'temperature'), '');
export const getCurrentFeel = (store) => _.defaultTo(_.get(getCurrently(store), 'apparentTempurature'), '');
export const getCurrentWindSpeed = (store) => _.defaultTo(_.get(getCurrently(store), 'windSpeed'), '');
export const getCurrentWindBearing = (store) => _.defaultTo(_.get(getCurrently(store), 'windBearing'), '');
export const getCurrentCloudCover = (store) => _.defaultTo(_.get(getCurrently(store), 'cloudCover'), '');

