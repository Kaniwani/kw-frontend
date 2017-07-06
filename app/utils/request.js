import 'whatwg-fetch';
import { getToken } from 'utils/auth';
import isEmpty from 'lodash/isEmpty';

const createRequestType = (method) => (url, body = {}, headers = {}) => request(url, { body, headers, method });
export const get = createRequestType('GET');
export const post = createRequestType('POST');
export const put = createRequestType('PUT');
export const patch = createRequestType('PATCH');
export const del = createRequestType('DELETE'); // del because "delete" is a reserved word in JS

/**
 * Makes a request!
 * @param  {String} [url=''] url to send request to
 * @param  {Object} config {method='GET', headers={}, body={}}
 * @return {Promise} response
 */
function request(url = '', { method, headers, body } = {}) {
  const finalUrl = formatUrl(url, method, body);
  const token = getToken();
  const combinedHeaders = {
    ...headers,
    Authorization: `JWT ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const config = { method, headers: combinedHeaders, body: JSON.stringify(body) };
  // no body allowed for these
  if (['GET', 'DELETE'].includes(method)) {
    delete config.body;
  }
  return fetch(finalUrl, config)
    .then(checkStatus)
    .then(parseJSON);
}

/**
 * Parses the JSON returned by a network request
 * @param  {object} response A response from a network request
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204) {
    return response; // no JSON
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 * @param  {object} response A response from a network request
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response = { status: 404, statusText: 'No response!' }) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  return error;
}

/**
 *
 * API requires body as a querystring for get/delete without trailing slash
 * All other request *do* require a trailing slash
 * @param {string} url request url
 * @param {string} method request method
 * @param {object} body request body
 * @returns {string} url with querystring and/or trailing slash as needed
 */
function formatUrl(url, method, body) {
  const needsConversion = ['GET', 'DELETE'].includes(method) && !isEmpty(body);
  return needsConversion ?
    `${url}/?${formatQueryString(body)}` :
    `${url}/`;
}

/**
 * Creates a properly formatted querystring from provided object
 * @param  {Object} params key/value pairs
 * @return {String} querystring
 */
function formatQueryString(params) {
  const esc = encodeURIComponent;
  return Object.keys(params)
     .map((key) => params[key] ? `${esc(key)}=${esc(params[key])}` : null)
     .filter((key) => key !== null)
     .join('&');
}
