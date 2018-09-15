import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { persistReducer, persistUiReducer } from 'common/persistence';

import { announcementsUiReducer, announcementsReducer } from 'features/announcements/reducer';
import { notificationsReducer } from 'features/notifications/reducer';
import { userUiReducer, userReducer, quizCountsReducer } from 'features/user/reducer';
import { vocabReducer } from 'features/vocab/reducer';
import { vocabLevelsUiReducer, vocabLevelsReducer } from 'features/vocab/Levels/reducer';
import { vocabLevelUiReducer } from 'features/vocab/Level/reducer';
import { reviewsReducer } from 'features/reviews/reducer';
import { synonymsUiReducer, synonymsReducer } from 'features/synonyms/reducer';
import { searchReducer } from 'features/search/reducer';
import { quizSessionReducer } from 'features/quiz/QuizSession/reducer';
import { quizAnswerReducer } from 'features/quiz/QuizSession/QuizAnswer/reducer';
import { quizInfoReducer } from 'features/quiz/QuizSession/QuizInfo/reducer';
import { quizSummaryReducer } from 'features/quiz/QuizSummary/reducer';
import appReducer from './appReducer';

const entitiesReducer = combineReducers({
  user: userReducer,
  vocab: vocabReducer,
  levels: vocabLevelsReducer,
  reviews: reviewsReducer,
  synonyms: synonymsReducer,
  announcements: announcementsReducer,
});

const rootReducer = combineReducers({
  app: appReducer,
  search: searchReducer,
  user: persistUiReducer('user', userUiReducer),
  announcements: persistUiReducer('announcements', announcementsUiReducer),
  levels: persistUiReducer('levels', vocabLevelsUiReducer),
  level: persistUiReducer('level', vocabLevelUiReducer),
  synonyms: synonymsUiReducer,
  quizCounts: persistReducer({ key: 'quizCounts' }, quizCountsReducer),
  quizSession: quizSessionReducer,
  quizSummary: persistReducer({ key: 'quizSummary' }, quizSummaryReducer),
  quizAnswer: quizAnswerReducer,
  quizInfo: quizInfoReducer,
  form: formReducer,
  router: routerReducer,
  notifications: notificationsReducer,
  entities: persistReducer({ key: 'entities' }, entitiesReducer),
});

export default rootReducer;
