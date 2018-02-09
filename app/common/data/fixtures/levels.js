import { random, range } from 'lodash';

export default range(1, 60).map((num) => {
  const isLocked = !!random(1);
  const isActionable = !!random(1);
  const isSubmitting = !random(8);
  return {
    isLocked,
    isActionable,
    isSubmitting,
    level: String(num),
    count: random(80, 120),
  }});
