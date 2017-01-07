//-----------------------------------------------------------------------------
//  KW API
//-----------------------------------------------------------------------------
import { API_BASE_URL } from 'shared/constants';

// TODO: add create{Endpoint}Request() that accept data as well
// For Example, synonym endpoint expects the following in request body:
//  id: IntegerField
//  character: CharField
//  kana: CharField R
//  review: PrimaryKeyRelatedField

/**
 * Creates a url for profiles endpoint requests
 * @param  {String} [id=''] - optional user id for specific profile requests
 * @return {String} url
 */
export function createProfileUrl(id = '') {
  return `${API_BASE_URL}/profiles/${id}`;
}

/**
 * Creates a url for synonym endpoint requests
 * @param  {String} [id=''] - optional user id for specific synonym requests
 * @return {String} url
 */
export function createSynonymUrl(id = '') {
  return `${API_BASE_URL}/synonym/${id}`;
}

/**
 * Creates a url for faq endpoint requests
 * @param  {String} [id=''] - optional user id for specific faq requests
 * @return {String} url
 */
export function createFaqUrl(id = '') {
  return `${API_BASE_URL}/faq/${id}`;
}

/**
 * Creates a url for vocabulary endpoint requests
 * @param  {String} [id=''] - optional user id for specific vocabulary requests
 * @return {String} url
 */
export function createVocabularyUrl(id = '') {
  return `${API_BASE_URL}/vocabulary/${id}`;
}

/**
 * Creates a url for reading endpoint requests
 * @param  {String} [id=''] - optional user id for specific reading requests
 * @return {String} url
 */
export function createReadingUrl(id = '') {
  return `${API_BASE_URL}/reading/${id}`;
}

/**
 * Creates a url for (vocabulary) level endpoint requests
 * @param  {String} [id=''] - optional user id for specific level requests
 * @return {String} url
 */
export function createLevelUrl(id = '') {
  return `${API_BASE_URL}/level/${id}`;
}

/**
 * Creates a url for (vocabulary) level lock/unlock endpoint requests
 * @param  {Boolean} [lock=true] - whether to lock or unlock
 * @return {String} url
 */
export function createLevelLockUrl(id, lock = true) {
  const action = lock ? 'lock' : 'unlock';
  return `${createLevelUrl(id)}/${action}`;
}

/**
 * Creates a url for review endpoint requests
 * @param  {String} [id=''] - optional user id for specific profile requests
 * @param  {Object} config - additionals paths or params
 * @return {String} url
 * @example
 * createReviewUrl({ id: 22, correctness: 'incorrect' });
 * // => '//localhost:8000/api/v1/review/22/incorrect'
 *
 * createReviewUrl({ category: 'critical' });
 * // => '//localhost:8000/api/v1/review/critical/'
 */
export function createReviewUrl(id = '', config) {
  let url = `${API_BASE_URL}/review/${id}`;
  const { correctness, visibility, category } = config;

  // individual item updates
  if (correctness) url = `${url}/${correctness}`;
  if (visibility) url = `${url}/${visibility}`;

  // critical or current list requests
  if (category) {
    url = `${url}/${category}`;
  }
  return url;
}


//-----------------------------------------------------------------------------
//  EXTERNAL
//-----------------------------------------------------------------------------
export const createJishoUrl = (keyword) => `//jisho.org/api/v1/search/words?keyword=${keyword}`;
