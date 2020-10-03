const getEventStore = (store) => store.eventStore;

export const getEvents = (store) => getEventStore(store) || [];