import faker from "faker/locale/en";
import { addMinutes } from "date-fns";
import { range, random, sample } from "lodash";
import { WK_SRS_RANKS } from "common/constants";
import { serializeUpcomingReviews } from "common/serializers";
import { halfChance, quarterChance } from "./utils";

const name = faker.internet.userName();
const unlockedLevels = range(random(60)).map(String);
const upcomingReviews = serializeUpcomingReviews(
  range(24).map(() => halfChance(0, random(10, 200)))
);

export default {
  id: random(10),
  username: name,
  email: faker.internet.email(),
  reviewsCount: halfChance(0, random(200)),
  lessonsCount: halfChance(0, random(500)),
  apiKey: faker.random.uuid(),
  apiValid: quarterChance(false, true),
  level: unlockedLevels.length,
  followMe: faker.random.boolean(),
  unlockedLevels,
  lastWanikaniSyncDate: halfChance(null, faker.date.recent()),
  autoAdvanceOnSuccessDelayMilliseconds: faker.random.boolean(),
  autoExpandAnswerOnSuccess: faker.random.boolean(),
  autoExpandAnswerOnFailure: faker.random.boolean(),
  onVacation: faker.random.boolean(),
  vacationDate: quarterChance(faker.date.past(), null),
  minimumWkSrsLevelToReview: sample(Object.values(WK_SRS_RANKS)),
  upcomingReviews,
  nextReviewDate: halfChance(null, addMinutes(new Date(), random(30))),
  joinDate: faker.date.past(),
  srsCounts: {
    UNTRAINED: halfChance(0, random(1000)),
    APPRENTICE: halfChance(0, random(1000)),
    GURU: halfChance(0, random(1000)),
    MASTER: halfChance(0, random(1000)),
    ENLIGHTENED: halfChance(0, random(1000)),
    BURNED: halfChance(0, random(1000)),
  },
};
