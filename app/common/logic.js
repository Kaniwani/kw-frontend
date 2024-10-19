import { createLogic } from 'redux-logic';
import { LOCATION_CHANGE } from 'react-router-redux';

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

import { app } from 'common/actions';
import announcements from 'features/announcements/actions';
import notify from 'features/notifications/actions';
import Raven from 'common/raven';

const errorLogic = createLogic({
  type: app.captureError,
  process({ action: { payload, meta } }) {
    Raven.captureException(payload, { extra: meta });
  },
});

const updateLogic = createLogic({
  type: LOCATION_CHANGE,
  process(_, dispatch, done) {
    if (localStorage.getItem('kw_update') === 'true') {
      localStorage.removeItem('kw_update');
      dispatch(announcements.load.request({ force: true }));
      setTimeout(() => {
        dispatch(
          notify.info({
            content: 'KaniWani update ready! Reload the app to start using the new version.',
          })
        );
        done();
      }, 2000);
    } else {
      done();
    }
  },
});

export default [
  errorLogic,
  updateLogic,
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
];
