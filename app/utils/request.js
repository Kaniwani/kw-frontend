import 'whatwg-fetch';

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
 *
 * @param  {object} response   A response from a network request
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  const status = (response.status || response.meta.status || 404); // jisho api uses response.meta
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
export default function request(url, options) {
  const config = Object.assign({ credentials: 'include' }, options);
  return fetch(url, config)
    .then(checkStatus)
    .then(parseJSON);
}

/*
TODO: beef up request with an api
function getQueryString(params) {
   var esc = encodeURIComponent;
   return Object.keys(params)
     .map(k => esc(k) + '=' + esc(params[k]))
     .join('&');
 }

 function request(params) {
   var method = params.method || 'GET';
   var qs = '';
   var body;
   var headers = params.headers || {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
   };

   if (['GET', 'DELETE'].indexOf(method) > -1)
     qs = '?' + getQueryString(params.data);
   else // POST or PUT
     body = JSON.stringify(params.data);

   var url = params.url + qs;

   return fetch(url, { method, headers, body });
 }

 export default {
   get: params => request(Object.assign({ method: 'GET' }, params)),
   post: params => request(Object.assign({ method: 'POST' }, params)),
   put: params => request(Object.assign({ method: 'PUT' }, params)),
   delete: params => request(Object.assign({ method: 'DELETE' }, params))
 };
 */
