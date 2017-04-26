import 'whatwg-fetch';

/**
 * Makes a request!
 * @param  {Object} config {url='', method='GET', headers={}, body={}}
 * @return {Promise} response
 */
function request({ url = '', method = 'GET', headers = {}, body = {} } = {}) {
  let requestUrl = url;
  let requestBody = {};
  let requestHeaders = {
    ...headers,
    'Accept': 'application/json', // eslint-disable-line quote-props
    'Content-Type': 'application/json',
  };
  if (body.token) {
    requestHeaders = {
      ...requestHeaders,
      Authorization: `JWT ${body.token}`,
    };
    delete body.token; // eslint-disable-line no-param-reassign
  }

  if (['GET', 'DELETE'].includes(method)) {
    requestUrl += `${Object.keys(body).length ? `/?${getQueryString(body)}` : '/'}`; // NOTE: DRF requires trailing slashes
  } else { // POST, PUT, PATCH
    requestUrl += '/'; // NOTE: DRF requires trailing slashes
    requestBody = JSON.stringify(body);
  }

  return fetch(requestUrl, { method, headers: requestHeaders, body: requestBody })
    .then(checkStatus)
    .then(parseJSON);
    // .catch(console.error); // dev only
}

export default {
  get: (config) => request({ ...config, method: 'GET' }),
  post: (config) => request({ ...config, method: 'POST' }),
  put: (config) => request({ ...config, method: 'PUT' }),
  patch: (config) => request({ ...config, method: 'PATCH' }),
  delete: (config) => request({ ...config, method: 'DELETE' }), // delete is a reserved word in JS
};


/**
 * Parses the JSON returned by a network request
 * @param  {object} response A response from a network request
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204) return response; // no JSON
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 * @param  {object} response A response from a network request
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response = { status: 404, statusText: 'No response!' }) {
  if (response.status >= 200 && response.status < 300) return response;

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Creates a properly formatted querystring from provided object
 * @param  {Object} params key/value pairs
 * @return {String} querystring
 */
function getQueryString(params) {
  const esc = encodeURIComponent;
  return Object.keys(params)
     .map((key) => `${esc(key)}=${esc(params[key])}`)
     .join('&');
}
