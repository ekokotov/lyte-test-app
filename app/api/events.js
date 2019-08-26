import APIRequest from './request';

class EventsAPI {
    getAll = (limit, offset, search) => {
      const params = { limit, offset };
      if (search && search.length) {
        params.search = search;
      }
      return APIRequest.request(process.env.API_EVENTS_LIST_PATH, 'GET', params);
    }

    getById = (id) => APIRequest.request(`${process.env.API_EVENTS_LIS}/${id}`, 'GET', { id });
}


export default new EventsAPI();
