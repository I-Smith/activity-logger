/**
 * Creates a reducer function that provides routing to the correct action handler.
 * If unloading a page isn't handled specifically, return the store to its original state.
 *
 * @param {object} currentState - The current state.
 * @param {object} action - The action to process.
 * @param {object} reducers - Mapping of actions to reducer functions
 * @param {*} [initalState] - The initial state (used when state is undefined or if unloading a page).
 * @returns {object} - The next state.
 */
export default (
    currentState,
    action,
    reducers,
    initalState,
) => {
    const targetReducer = reducers[action.type];

    // Execute reducer if it exists
    if (typeof targetReducer === 'function') {
        return targetReducer(currentState || initalState, action)
    }
    return currentState || initalState;
}