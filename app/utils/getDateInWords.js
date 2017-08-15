import format from 'date-fns/format';
import { DATE_IN_WORDS } from 'shared/constants';

/**
 * Formats a Date() object to a human readable string
 * @param  {Date} date js Date()
 * @return {String} date in words
 * @example
 * format(new Date(2014, 6, 2), DATE_IN_WORDS)
 * // => Wednesday 2 July 2014
 */
export default function getDateInWords(date) {
  return date != null ? format(date, DATE_IN_WORDS) : 'N/A';
}
