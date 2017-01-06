import 'whatwg-fetch';

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  const status = (response.status || response.meta.status || 404);
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
export default function post(url, data, options = { asJSON: true }) {
  let mergedOptions = Object.assign({
    method: 'POST',
    body: Object.assign({}, data), // might need to already be: new FormData(data)
    credentials: 'include',
  }, options);

  if (options.asJSON) {
    mergedOptions = Object.assign(mergedOptions, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  return fetch(url, mergedOptions).then(checkStatus);
}
