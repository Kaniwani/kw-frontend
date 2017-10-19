import isPast from 'date-fns/is_past';
import isFuture from 'date-fns/is_future';
import format from 'date-fns/format';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import { DATE_FORMAT } from 'shared/constants';

function getReviewStatusText({ vacationDate, reviewsCount, nextReviewDate }) {
  if (vacationDate) {
    return `On Vacation since ${format(vacationDate, DATE_FORMAT)}`;
  }
  if (reviewsCount < 1 && nextReviewDate === false) {
    return 'Next Review: No reviews unlocked';
  }
  if (isPast(nextReviewDate)) {
    return 'Next Review: Now!';
  }
  if (isFuture(nextReviewDate)) {
    return `Next Review: ${distanceInWordsToNow(nextReviewDate, { includeSeconds: true, suffix: true })}`;
  }
  return 'Next Review: Unknown';
}

export default getReviewStatusText;
