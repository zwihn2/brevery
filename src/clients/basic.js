import axios from 'axios';

export const getEscapedKeyValuePair = (key, value) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;

export const buildUrl = (url, params) => `${url}?${
    Object
        .keys(params)
        .filter(key => (params[key] && params[key] !== undefined))
        .map(key => getEscapedKeyValuePair(key, params[key]))
        .join('&')
}`;

export const executeRequest = (url, filters = {}) => {
    console.log('executeRequest:', buildUrl(url, { ...filters }));
    return axios.get(buildUrl(url, { ...filters }))
        .then( response => response.data, ({ message }) => ({ error: message }));
};