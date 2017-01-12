//-----------------------------------------------------------------------------
//  KW API
//-----------------------------------------------------------------------------
import { API_BASE_URL } from 'shared/constants';

// TODO: add ${Endpoint}Request() that accept data as well
// For Example, synonym endpoint expects the following in request body:
//  id: IntegerField
//  character: CharField
//  kana: CharField R
//  review: PrimaryKeyRelatedField

/**
 * Creates a url for endpoint requests
 * @param  {String} [path=''] - optional path to build endpoint
 * @param  {String} [id=''] - optional id for specific requests
 * @return {String} url
 */
export function createRequestUrl(path = '', id = '') {
  return `${API_BASE_URL}${path}/${id ? `${id}/` : ''}`;
}

/**
* Creates a url for obtaining an auth token
* @return {String} url
*/
export const createAuthTokenUrl = () => createRequestUrl('token-auth');

/**
 * Creates a url for user endpoint requests
 * /user/ <-- if admin, will list all users. If NON-admin, will list only self
 * /user/me/ <-- always just shows self
 * /user/sync/ < -- POST to sync to WK
 * /user/srs/ <-- POST to perform SRS (edited)
 * @param {String|Number} [path='me'] - path or user id
 * @return {String} url
 */
export const createUserUrl = (path = 'me') => createRequestUrl('user', path);

/**
 * Creates a url for synonym endpoint requests
 * add -> /api/v1/synonym [POST]
 * remove -> /api/v1/synonym/{pk}/ [DELETE]
 * get one -> /api/v1/synonym/{PK} [GET]
 * get all -> /api/v1/synonym/ [GET]
 * @param  {String} [id=''] - optional user id for specific synonym requests
 * @return {String} url
 */
export const createSynonymUrl = (id = '') => createRequestUrl('synonym', id);

/**
 * Creates a url for faq endpoint requests
 * @param  {String} [id=''] - optional user id for specific faq requests
 * @return {String} url
 */
export const createFaqUrl = (id = '') => createRequestUrl('faq', id);

/**
 * Creates a url for vocabulary endpoint requests
 * Possible queries:
 * level {number}
 * srs_level {string} ????? to be added
 * meaning__contains
 * readings__kana__contains
 * readings__character__contains
 * @param  {String} [id=''] - optional user id for specific vocabulary requests
 * @return {String} url
 */
export const createVocabularyUrl = (id = '', queries = '') => {
  if (!id) return `${createRequestUrl('vocabulary', null)}${queries}`;
  return createRequestUrl('vocabulary', id);
};
/**
 * Creates a url for reading endpoint requests
 * @param  {String} [id=''] - optional user id for specific reading requests
 * @return {String} url
 */
export const createReadingUrl = (id = '') => createRequestUrl('reading', id);

/**
 * Creates a url for (vocabulary) level endpoint requests
 * @param  {String} [id=''] - optional user id for specific level requests
 * @return {String} url
 */
export const createLevelUrl = (id = '') => createRequestUrl('level', id);

/**
 * Creates a url for (vocabulary) level lock/unlock endpoint requests
 * Possible queries:
 * count {number} (number of items to unlock)
 * @param  {Boolean} [lock=true] - whether to lock or unlock
 * @return {String} url
 */
export function createLevelLockUrl(id, lock = true) {
  const action = lock ? 'lock' : 'unlock';
  return `${createLevelUrl(id)}${action}/`;
}

/**
 * Creates a url for review endpoint requests
 * @param  {String} [id=''] - optional user id for specific requests
 * @param  {Object} [config={}] - additional paths or params
 * @return {String} url
 * @example
 * createReviewUrl(22, { correctness: 'incorrect' });
 * // => '//localhost:8000/api/v1/review/22/incorrect/'
 *
 * createReviewUrl({ category: 'critical' });
 * // => '//localhost:8000/api/v1/review/critical/'
 */
export function createReviewUrl(id = '', config = {}) {
  let url = createRequestUrl('review', id);
  const { correctness, visibility, category } = config;

  // individual item updates
  if (correctness) url = `${url}${correctness}/`;
  if (visibility) url = `${url}${visibility}/`;

  // critical or current list requests
  if (category) {
    url = `${url}${category}/`;
  }
  return url;
}


//-----------------------------------------------------------------------------
//  EXTERNAL
//-----------------------------------------------------------------------------
export const createJishoApiUrl = (keyword) => `//jisho.org/api/v1/search/words?keyword=${keyword}`;
export const createJishoUrl = (keyword) => `//jisho.org/search/${keyword}`;
