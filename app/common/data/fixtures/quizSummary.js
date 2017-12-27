import { random, sampleSize } from 'lodash';
import faker from 'faker/locale/en';
import reviews from 'common/data/fixtures/reviews';
import groupByRank from 'common/utils/groupByRank';
import { halfChance, quarterChance } from './utils';

export default {
  category: halfChance('lessons', 'reviews'),
  remainingCount: random(50),
  isOnVacation: halfChance(true, false),
  percentCorrect: random(100),
  lastActivityDate: quarterChance(false, faker.date.recent()),
  onResetSummary: () => window.alert('reset redux session state'),
  correctItems: groupByRank(sampleSize(reviews, random(30))),
  incorrectItems: groupByRank(sampleSize(reviews, random(30))),
  criticalItems: halfChance({}, groupByRank(sampleSize(reviews, random(30)))),
};
