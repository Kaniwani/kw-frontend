import { get, put, post, patch, del } from 'utils/request';
import * as urls from './urls';

// FIXME: selectUsername etc from state to prefill defaults where possible!

//-----------------------------------------------------------------------------
//  AUTHORIZATION
//-----------------------------------------------------------------------------
export const getUserAuth = ({
  id = 0,
  username = 'No username provided', // select from state
  email = 'No email provided',
} = {}) => get({
  url: urls.userCredentials,
  body: { id, username, email },
});

export const loginUser = ({
  username = 'No username provided',
  password = 'No email provided',
} = {}) => post({
  url: urls.userLogin,
  body: { username, password },
});

export const updateUserAuth = ({
  id = 0,
  username = 'No username provided',
  email = 'No email provided',
} = {}) => patch({
  url: urls.userCredentials,
  body: { id, username, email },
});


export const registerUser = ({
  email = 'No email provided',
  username = 'No username provided',
  password = 'No password provided',
  apiKey = 0,
} = {}) => post({
  url: urls.register,
  body: { email, username, password, api_key: apiKey },
});

export const activateUser = ({
  uid = 'No uid provided',
  token = 'No token provided',
} = {}) => post({
  url: urls.activate,
  body: { uid, token },
});

export const changeUsername = ({
  username = 'No username provided',
} = {}) => post({
  url: urls.username,
  body: { username },
});


export const changePassword = ({
  password = 'No password provided',
}) => post({
  url: urls.password,
  body: { password },
});

// send email to user with password reset link.
export const passwordReset = ({
  email = 'No email provided',
} = {}) => post({
  url: urls.passwordReset,
  body: { email },
});

// endpoint to finish reset password process
export const passwordConfirm = () => post({ url: urls.passwordConfirm });

//-----------------------------------------------------------------------------
//  USER
//-----------------------------------------------------------------------------
export const getUsers = () => get({ url: urls.user });
export const getUserProfile = () => get({ url: urls.userProfile });
export const syncKw = () => post({ url: urls.userSrs });
export const syncWk = ({
  fullSync = false, // true to force ALL users to sync with WK
} = {}) => post({
  url: urls.userSync,
  body: { full_sync: fullSync },
});

//-----------------------------------------------------------------------------
//  REVIEWS
//-----------------------------------------------------------------------------
export const getReviews = ({
  level = 0,
  offset = 0,
  limit = 100,
  meaningContains = '',
  srsLevel = 0,
  srsLevelLt = 0,
  srsLevelGt = 0,
} = {}) => get({
  url: urls.reviews,
  body: {
    level,
    offset,
    limit,
    meaning_contains: meaningContains,
    srs_level: srsLevel,
    srs_level_lt: srsLevelLt,
    srs_level_gt: srsLevelGt,
  },
});

export const getCriticalReviews = ({
  offset = 0,
  limit = 100,
} = {}) => get({
  url: urls.criticalReviews,
  body: { offset, limit },
});

export const getCurrentReviews = ({
  offset = 0,
  limit = 100,
} = {}) => get({
  url: urls.currentReviews,
  body: { offset, limit },
});

export const getReviewEntry = id => get({ url: urls.reviewEntry(id) });
export const reviewCorrect = id => post({ url: urls.reviewCorrect(id) });
export const reviewIncorrect = id => post({ url: urls.reviewIncorrect(id) });
export const hideReview = id => post({ url: urls.hideReview(id) });
export const unhideReview = id => post({ url: urls.unhideReview(id) });

//-----------------------------------------------------------------------------
//  SYNONYMS
//-----------------------------------------------------------------------------
export const addSynonym = (id, {
  character = '',
  kana = '',
} = {}) => post({
  url: urls.synonym,
  body: {
    character,
    kana,
    review: id,
  },
});

export const removeSynonym = id => del({
  url: urls.synonymEntry(id),
});

//-----------------------------------------------------------------------------
//  VOCABULARY
//-----------------------------------------------------------------------------
export const getVocabulary = ({
  level = 0,
  offset = 0,
  limit = 100,
  meaningContains = '',
  readingsKanaContains = '',
  readingsCharacterContains = '',
} = {}) => get({
  url: urls.vocabulary,
  body: {
    level,
    meaning_contains: meaningContains,
    readings_kana_contains: readingsKanaContains,
    readings_character_contains: readingsCharacterContains,
    offset,
    limit,
  },
});

export const getVocabularyEntry = id => get({ url: urls.vocabularyEntry(id) });

export const getReadings = ({
  offset = 0,
  limit = 100,
} = {}) => get({
  url: urls.reading,
  body: { offset, limit },
});

export const getReadingEntry = id => get({ url: urls.readingEntry(id) });
export const getLevels = () => get({ url: urls.levels });

export const getLevelVocabulary = ({
  level = 0,
  offset = 0,
  limit = 100,
  hyperlink = false,
} = {}) => get({
  url: urls.vocabulary,
  body: {
    level,
    offset,
    limit,
    hyperlink,
  },
});


export const lockLevel = level => post({ url: urls.lockLevel(level) });
export const unlockLevel = level => post({ url: urls.unlockLevel(level) });

//-----------------------------------------------------------------------------
//  GENERAL
//-----------------------------------------------------------------------------
export const getFaqs = () => get({ url: urls.faq });
export const getFaq = id => get({ url: urls.faqEntry(id) });

export const addFaq = ({
  question = '',
  answer = '',
} = {}) => post({
  url: urls.faq,
  body: { question, answer },
});

export const updateFaq = ({
  question = '',
  answer = '',
} = {}) => put({
  url: urls.faq,
  body: { question, answer },
});

export const getAnnouncements = () => get({ url: urls.announcement });
export const getAnnouncement = id => get({ url: urls.announcementEntry(id) });

export const addAnnouncement = ({
  title = '',
  body = '',
} = {}) => post({
  url: urls.announcement,
  body: { title, body },
});

export const updateAnnouncement = ({
  title = '',
  body = '',
} = {}) => put({
  url: urls.announcement,
  body: { title, body },
});

export const sendContactMessage = ({
  name = 'No name provided',
  email = 'No email provided',
  body = 'No body provided',
} = {}) => post({
  url: urls.contact,
  body: { name, email, body },
});
