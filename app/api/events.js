import APIRequest from './request';

class EventsAPI {
    getAll = (limit, offset) => APIRequest.request(process.env.API_EVENTS_LIST_PATH, 'GET', { limit, offset });

    getById = (id) => APIRequest.request(`${process.env.API_EVENTS_LIS}/${id}`, 'GET', { id });
}


export default new EventsAPI();
