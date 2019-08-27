import APIRequest from './request';

class EventsAPI {
    getAll = (limit, offset, search, minPrice, maxPrice) => {
      const params = { limit, offset };

      if (search && search.length) {
        params.search = search;
      }
      if (minPrice) {
        params.min_ticket_price = minPrice;
      }
      if (maxPrice) {
        params.max_ticket_price = maxPrice;
      }
      return APIRequest.request(process.env.API_EVENTS_LIST_PATH, 'GET', params);
    };

    getById = (id) => APIRequest.request(`${process.env.API_EVENTS_LIS}/${id}`, 'GET', { id });
}


export default new EventsAPI();
