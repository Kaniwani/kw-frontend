/**
 * Splits string at given delimiter but includes it at its location(s) in the result array
 * @param  {String} text
 * @param  {String} delimiter
 * @return {Array}
 */
export default function splitKeepingDelimiter(text, delimiter) {
  const delim = new RegExp(`(${delimiter})`, 'g');
  return text.split(delim);
}
