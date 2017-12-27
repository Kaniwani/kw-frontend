/**
 * Removes '〜' or '~' from text
 * @param  {String} [text=''] string to remove all tildes from
 * @return {String} cleaned string
 * @example
 * stripTilde('〜回')
 * // => '回'
 */
function stripTilde(text = '') {
  return text.replace(/[〜~]/gi, '');
}

export default stripTilde;
