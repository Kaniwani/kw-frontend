import faker from 'faker/locale/en';

export const halfChance = (a, b) => (faker.random.boolean() ? a : b);
export const quarterChance = (quarter, threeQuarter) =>
  halfChance(threeQuarter, halfChance(threeQuarter, quarter));
