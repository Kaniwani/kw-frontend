import { createLogic } from 'redux-logic';

import { app } from 'common/actions';
import user from 'features/user/actions';
import vocab from 'features/vocab/actions';
import notify from 'features/notifications/actions';
import { selectUserDomain } from 'features/user/selectors';
import settings from './actions';

export const saveSettingsLogic = createLogic({
  type: settings.save.request,
  process(
    {
      getState,
      api,
      serializers,
      action: {
        payload,
        meta: { form },
      },
    },
    dispatch,
    done
  ) {
    const { serializeUserProfile, deserializeUserProfile } = serializers;
    const { username, email, profile } = selectUserDomain(getState());
    const updatedProfile = deserializeUserProfile(payload);
    const filterChanged = profile.minimumWkSrsLevelToReview !== payload.minimumWkSrsLevelToReview
      || profile.maximumWkSrsLevelToReview !== payload.maximumWkSrsLevelToReview;

    form.startSubmit();
    api.user
      .update({ id: profile.id, ...updatedProfile })
      .then((response) => {
        form.stopSubmit();
        dispatch(
          user.load.success({
            username,
            email,
            profile: serializeUserProfile(response),
          })
        );

        if (filterChanged) {
          dispatch(user.quizCounts.request());
          dispatch(user.load.request());
          dispatch(vocab.levels.load.request());
        }

        dispatch(settings.save.success());
        dispatch(notify.success({ content: 'Settings Saved!', duration: 3000 }));
        done();
      })
      .catch((err) => {
        dispatch(settings.save.failure(err));
        if (err.json && err.json.api_key) {
          form.stopSubmit({ apiKey: err.json.api_key[0] });
        } else {
          dispatch(
            notify.error({
              content:
                'Something went wrong saving your settings. Please wait a few moments and try again.',
            })
          );
          dispatch(app.captureError(err, payload));
          form.stopSubmit();
        }
        done();
      });
  },
});

export const resetProgressLogic = createLogic({
  type: settings.resetProgress.request,
  process(
    {
      api,
      action: { payload },
    },
    dispatch,
    done
  ) {
    api.user
      .resetProgress(payload)
      .then(() => {
        dispatch(user.load.request({ force: true }));
        dispatch(vocab.levels.load.request());
        dispatch(notify.success({ content: 'Reset complete!', duration: 3000 }));
        done();
      })
      .catch((err) => {
        dispatch(app.captureError(err, payload));
        dispatch(
          notify.error({
            content:
              'Something went wrong contacting the server to reset your progress. Please reload and try again or contact us with details of what happened.',
          })
        );
        done();
      });
  },
});

export default [resetProgressLogic, saveSettingsLogic];
