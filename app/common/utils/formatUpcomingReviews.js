/* eslint-disable no-return-assign */
import { format, addHours, addDays } from 'date-fns';

const formatUpcomingReviews = (data = []) => {
  let extraDays = 0;
  const getFutureDayName = (daysAhead = 0) => format(addDays(new Date(), daysAhead), 'dddd');
  const genDay = (hour) => (hour === '12am' ? getFutureDayName((extraDays += 1)) : '');
  const genHour = (index) => `${format(addHours(new Date(), index), 'ha')}`;

  return data.reduce((list, value, index) => {
    const hour = genHour(index);
    return list.concat({
      day: genDay(hour),
      hour,
      value,
    });
  }, []);
};

export default formatUpcomingReviews;
