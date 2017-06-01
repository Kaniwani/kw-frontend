import { TILDE_JA, TILDE_EN } from 'shared/constants';

/**
 * Removes '〜' or '~' from text
 * @param  {String} [text=''] string to remove tilde from
 * @return {String} cleaned string
 * @example
 * stripTilde('〜回')
 * // => '回'
 */
function stripTilde(text = '') {
  return text.replace(new RegExp(`${TILDE_JA}|${TILDE_EN}`, 'gi'), '');
}

export default stripTilde;
