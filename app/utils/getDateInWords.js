import format from 'date-fns/format';
import { DATE_IN_WORDS } from 'shared/constants';

export default function getDateInWords(date) {
  return date != null ?
    format(date, DATE_IN_WORDS) :
    'unknown';
}
