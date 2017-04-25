/**
 * Uppercase first letter of string; downcase the rest.
 * @param  {String} [str=""] soMeStR
 * @return {String} Somestr
 */
export default function titleCase(str = '') {
  return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
}
