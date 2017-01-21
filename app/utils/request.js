import 'whatwg-fetch';

/**
 * Makes a request!
 * @param  {Object) config {url, method, body, headers}
 * @param  {Boolean) authToken - JWT token
 * @return {Object} response
 */
function request(config) {
  let requestUrl = config.url;
  let requestBody = {};
  let requestHeaders = {
    ...config.headers,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  if (config.body.token) {
    requestHeaders = {
      ...requestHeaders,
      Authorization: `JWT ${config.body.token}`,
    };
    delete config.body.token; // eslint-disable-line no-param-reassign
  }

  if (['GET', 'DELETE'].includes(config.method)) {
    requestUrl += `${config.body ? `/?${getQueryString(config.body)}` : '/'}`; // NOTE: DRF requires trailing slashes
  } else { // POST, PUT, PATCH
    requestUrl += '/'; // NOTE: DRF requires trailing slashes
    requestBody = JSON.stringify(config.body);
  }

  return fetch(requestUrl, { method: config.method, headers: requestHeaders, body: requestBody })
    .then(checkStatus)
    .then(parseJSON);
    // .catch(console.error); // dev only
}

export default {
  get: (config) => request({ ...config, method: 'GET' }),
  post: (config) => request({ ...config, method: 'POST' }),
  put: (config) => request({ ...config, method: 'PUT' }),
  patch: (config) => request({ ...config, method: 'PATCH' }),
  delete: (config) => request({ ...config, method: 'DELETE' }),
};


/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not

 * @param  {object} response   A response from a network request
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
