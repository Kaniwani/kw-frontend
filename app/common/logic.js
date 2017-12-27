import landingLogic from 'features/landing/logic';
import userLogic from 'features/user/logic';
import announcementsLogic from 'features/announcements/logic';
import vocabLogic from 'features/vocab/logic';
import vocabLevelsLogic from 'features/vocab/Levels/logic';
import vocabLevelLogic from 'features/vocab/Level/logic';
import reviewsLogic from 'features/reviews/logic';
import synonymsLogic from 'features/synonyms/logic';
import searchLogic from 'features/search/logic';
import quizSessionLogic from 'features/quiz/QuizSession/logic';
import quizAnswerLogic from 'features/quiz/QuizSession/QuizAnswer/logic';
import settingsLogic from 'features/settings/logic';
import contactLogic from 'features/contact/logic';

export default [
  ...landingLogic,
  ...userLogic,
  ...announcementsLogic,
  ...vocabLogic,
  ...vocabLevelsLogic,
  ...vocabLevelLogic,
  ...reviewsLogic,
  ...synonymsLogic,
  ...searchLogic,
  ...quizSessionLogic,
  ...quizAnswerLogic,
  ...settingsLogic,
  ...contactLogic,
];
