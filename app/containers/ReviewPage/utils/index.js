export const add = (b) => (a) => a + b;
export const subtract = (b) => (a) => a - b;

/**
 * Helper function to correctly decrement streak value and increase count of incorrect.
 * If user is nearing burned status, they get doubly-decremented.
 * @param  {Number} streak
 * @return {Number} decreased streak or 0 (if decreased streak is negative)
 */
export const getDecreasedStreak = (streak) => {
  const newStreak = streak === 7 ? streak - 2 : streak - 1;
  return Math.max(0, newStreak);
};
