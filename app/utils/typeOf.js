/**
 * Returns type of provided value with normalized strings.
 * IE 'array' instead of '[object Array]' for [].
 *
 * @param {Any} value value to test
 * @return {String} type (number, nan, object, array, map, set, regexp, date, function etc)
 */
export default function typeOf(value) {
  switch (true) {
    case (Number.isNaN(value)): return 'nan';
    case (value === null): return 'null';
    case (value !== Object(value)): return typeof value;
    default: return ({}).toString.call(value).slice(8, -1).toLowerCase();
  }
}
