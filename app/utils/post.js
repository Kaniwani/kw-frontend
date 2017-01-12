import 'whatwg-fetch';
import Cookies from 'js-cookie';

const CSRF_TOKEN = Cookies.get('csrftoken');

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.statusText === 'No Content' ? response : response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  const status = (response.status || response.meta.status || 404);
  console.log(response);
  if (status >= 200 && status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           The response data
 */
export default function post(url, data, options = {}) {
  const mergedOptions = Object.assign({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': CSRF_TOKEN,
    },
    body: JSON.stringify(data),
    credentials: 'include',
  }, options);

  return fetch(url, mergedOptions)
    .then(checkStatus)
    .then(parseJSON);
}
