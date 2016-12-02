import typeOf from './typeOf';

// TODO: unit tests
// const isEmptyTests = [new Map(), new Set(), [], {}, null, undefined, '', 0, true, false, Date, function noop() {}, new Map([['key1', 'value1']]), new Set([1, 1, 2]), [2], { derp: 'alerp' }, 'derpalerp'];


/**
 * Tests if value is empty
 * Map()     true, empty Map
 * Set()     true, empty Set
 * []        true, empty array
 * {}        true, empty object
 * null      true
 * undefined true
 * ""        true, empty string
 * ''        true, empty string
 * 0         false, number
 * true      false, boolean
 * false     false, boolean
 * Date      false
 * function  false
 * @param  {any}  value Test target
 * @return {Boolean} True if empty, false if has content or not a container (function, number, boolean etc.)
 */
export default function isEmpty(value) {
  if (value == null) {
    return true;
  }
  const type = typeOf(value);

  if (type === 'function' || type === 'number' || type === 'boolean' || type === 'date') {
    return false;
  }

  if (((type === 'array' || type === 'string') && value.length === 0) ||
      ((type === 'map' || type === 'set') && value.size === 0)) {
    return true;
  }

  if (type === 'object') {
    const objectSize = Object.keys(value).length;
    if (objectSize < 1) return true;
  }
  return false;
}
