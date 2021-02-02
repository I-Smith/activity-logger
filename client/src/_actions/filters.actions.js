import { filtersConstants } from '../_constants';

export const filtersActions = {
	setFilterValue,
};

function setFilterValue(name, value) {
    return dispatch => {
        dispatch({ type: filtersConstants.SET_FILTER, payload: { name, value} });
    };
}