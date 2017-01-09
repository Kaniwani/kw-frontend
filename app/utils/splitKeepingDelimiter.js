/**
 * Splits string at given delimiter but keeps it at its location(s) in the result array
 * @param  {String} text
 * @param  {String} delimiter - RegExp
 * @param  {String} [flags='g'] - RegExp flags like 'gi'
 * @return {Array}
 * @example
 * splitKeepingDelimiter('This;is;an;example;here',';')
 * // => [ 'This', ';', 'is', ';', 'an', ';', 'example', ';', 'here' ]
 * splitKeepingDelimiter('We want to split but keep WORD with this sentence', 'word', 'gi')
 * // => [ 'We want to split but keep ', 'WORD', ' with this sentence' ]
 */
export default function splitKeepingDelimiter(text, delimiter, flags = 'g') {
  const delim = new RegExp(`(${delimiter})`, flags);
  return text.split(delim);
}
