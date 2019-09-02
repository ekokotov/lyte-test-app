import APIRequest from './request';

class EventsAPI {
    getAll = (options) => {
      const {
        limit, currentPage, searchQuery, minPrice, maxPrice,
      } = options;
      const params = { limit, offset: currentPage * limit };

      if (searchQuery.length) {
        params.search = searchQuery;
      }
      if (minPrice) {
        params.min_ticket_price = minPrice;
      }
      if (maxPrice) {
        params.max_ticket_price = maxPrice;
      }
      return APIRequest.request(process.env.API_EVENTS_SEARCH_PATH, 'GET', params);
    };

    getById = (id) => APIRequest.request(`${process.env.API_EVENTS_LIST_PATH}/${id}/`, 'GET');

    update = (id, data, options) => APIRequest.request(`${process.env.API_EVENTS_LIST_PATH}/${id}/`, 'PATCH', data, options);
}

export default new EventsAPI();
