import conf from 'app/conf';
import { executeRequest } from 'clients/basic';

// const { serverUrl } = conf;

const serverUrl = 'https://api.openbrewerydb.org';

const LIST_URL = '/breweries';
const LIST_SEARCH_URL = '/breweries/search';

export const fetchList = params =>
    executeRequest(`${serverUrl}${LIST_URL}`, params);

export const fetchListSearch = params =>
    executeRequest(`${serverUrl}${LIST_SEARCH_URL}`, params);

export const fetchItem = id =>
    executeRequest(`${serverUrl}${LIST_URL}/${id}`);
