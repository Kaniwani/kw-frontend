/**
 * Splits string at given delimiter but keeps it at its location(s) in the result array
 * @param  {String} [text=''] input
 * @param  {String} [delimiter=','] string to provide to RegExp
 * @param  {String} [flags='g'] RegExp flags like 'gi'
 * @return {Array} text split including delimiter
 * @example
 * splitKeepingDelimiter('This;is;an;example;here',';')
 * // => [ 'This', ';', 'is', ';', 'an', ';', 'example', ';', 'here' ]
 * splitKeepingDelimiter('We want to split but keep WORD with this sentence', 'word', 'gi')
 * // => [ 'We want to split but keep ', 'WORD', ' with this sentence' ]
 */
export default function splitKeepingDelimiter(text = '', delimiter = ',', flags = 'g') {
  const delim = new RegExp(`(${delimiter})`, flags);
  return text.split(delim);
}
