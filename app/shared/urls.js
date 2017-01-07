//-----------------------------------------------------------------------------
//  KW API
//-----------------------------------------------------------------------------
import { API_BASE_URL } from 'shared/constants';

/**
 * Creates a url for profiles endpoint requests
 * @param  {String} [id=''] - optional user id for specific profile requests
 * @return {String} url
 */
export function createProfileUrl(id = '') {
  return `${API_BASE_URL}/profiles/${id}`;
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
export function createReviewUrl(id ='', config) {
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
