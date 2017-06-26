import urljoin from 'url-join';
import { get, put, post, patch, del } from 'utils/request';

const BASE_URL = '//localhost:8000'; // FIXME: change for production
const API_BASE = urljoin(BASE_URL, 'api', 'v1');

//-----------------------------------------------------------------------------
//  AUTHORIZATION
//-----------------------------------------------------------------------------
const authUrl = urljoin(API_BASE, 'auth');
const userLoginUrl = urljoin(authUrl, 'login');
const userCredentialsUrl = urljoin(authUrl, 'me'); // GET / PATCH
const registerUrl = urljoin(authUrl, 'register'); // POST
const activateUrl = urljoin(authUrl, 'activate'); // POST
const usernameUrl = urljoin(authUrl, 'username'); // POST
const passwordUrl = urljoin(authUrl, 'password'); // POST
const resetPasswordUrl = urljoin(passwordUrl, 'reset'); // POST
const confirmPasswordUrl = urljoin(resetPasswordUrl, 'confirm'); // POST

//-----------------------------------------------------------------------------
//  USER
//-----------------------------------------------------------------------------
const userUrl = urljoin(API_BASE, 'user'); // GET all users (if admin, else 'me')
const userProfileUrl = urljoin(userUrl, 'me'); // GET user profile
const userSrsUrl = urljoin(userUrl, 'srs'); // POST to get review count
const userSyncUrl = urljoin(userUrl, 'sync'); // POST to sync with WK

//-----------------------------------------------------------------------------
//  REVIEWS
//-----------------------------------------------------------------------------
const reviewsUrl = urljoin(API_BASE, 'review'); // GET all ready reviews
const criticalReviewsUrl = urljoin(reviewsUrl, 'critical'); // GET critical
const currentReviewsUrl = urljoin(reviewsUrl, 'current'); // GET current review queue
const reviewEntryUrl = (id) => urljoin(reviewsUrl, id); // GET single
const reviewCorrectUrl = (id) => urljoin(reviewEntryUrl(id), 'correct'); // POST correct answer
const reviewIncorrectUrl = (id) => urljoin(reviewEntryUrl(id), 'incorrect'); // POST incorrect answer
const hideReviewUrl = (id) => urljoin(reviewEntryUrl(id), 'hide'); // POST
const unhideReviewUrl = (id) => urljoin(reviewEntryUrl(id), 'unhide'); // POST

//-----------------------------------------------------------------------------
//  SYNONYMS
//-----------------------------------------------------------------------------
const synonymUrl = urljoin(API_BASE, 'synonym'); // POST add, GET get all
const synonymEntryUrl = (id) => urljoin(synonymUrl, id); // DELETE remove, GET one

//-----------------------------------------------------------------------------
//  VOCABULARY
//-----------------------------------------------------------------------------
const vocabularyUrl = urljoin(API_BASE, 'vocabulary'); // GET everything!
const vocabularyEntryUrl = (id) => urljoin(vocabularyUrl, id); // GET one
const readingUrl = urljoin(API_BASE, 'reading'); // GET all
const readingEntryUrl = (id) => urljoin(readingUrl, id); // GET one
const levelsUrl = urljoin(API_BASE, 'level'); // GET all
const levelEntryUrl = (level) => urljoin(levelsUrl, level); // GET one
const lockLevelUrl = (level) => urljoin(levelEntryUrl(level), 'lock'); // POST lock
const unlockLevelUrl = (level) => urljoin(levelEntryUrl(level), 'unlock'); // POST unlock

//-----------------------------------------------------------------------------
//  GENERAL
//-----------------------------------------------------------------------------
const faqUrl = urljoin(API_BASE, 'faq'); // GET all, POST create
const faqEntryUrl = (id) => urljoin(faqUrl, id); // GET, PUT update, PATCH partial update, DELETE
const announcementUrl = urljoin(API_BASE, 'announcement'); // GET all, POST create
const announcementEntryUrl = (id) => urljoin(announcementUrl, id); // GET one, PUT update, PATCH  partial update, DELETE
const contactUrl = urljoin(API_BASE, 'contact');

//-----------------------------------------------------------------------------
//  EXTERNAL
//-----------------------------------------------------------------------------
export const createJishoApiUrl = (keyword) => `//jisho.org/api/v1/search/words?keyword=${keyword}`;
export const createJishoUrl = (keyword) => `//jisho.org/search/${keyword}`;

// FIXME: selectUsername etc from state to prefill defaults where possible!

//-----------------------------------------------------------------------------
//  AUTHORIZATION
//-----------------------------------------------------------------------------
export const getUserAuth = ({ id, username, email }) =>
  get(
    userCredentialsUrl,
    { id, username, email }
  );

export const loginUser = ({ username, password }) =>
  post(
    userLoginUrl,
    { username, password }
  );

export const updateUserAuth = ({ id, username, email }) =>
  patch(
    userCredentialsUrl,
    { id, username, email }
  );

export const registerUser = ({ email, username, password, apiKey }) =>
  post(
    registerUrl,
    { email, username, password, api_key: apiKey }
  );

export const activateUser = (uid) => post(activateUrl, { uid });
export const changeUsername = (username) => post(usernameUrl, { username });
export const changePassword = (password) => post(passwordUrl, { password });
export const resetPassword = (email) => post(resetPasswordUrl, { email }); // send password reset email.
export const confirmPassword = () => post(confirmPasswordUrl); // finish reset password process

//-----------------------------------------------------------------------------
//  USER
//-----------------------------------------------------------------------------
export const getUsers = () => get(userUrl);
export const getUserProfile = () => get(userProfileUrl);
export const syncKw = () => post(userSrsUrl);
// true to force ALL users to sync with WK
export const syncWk = (fullSync = false) => post(userSyncUrl, { full_sync: fullSync });

//-----------------------------------------------------------------------------
//  REVIEWS
//-----------------------------------------------------------------------------
export const getReviews = ({
  level,
  offset = 0,
  limit = 100,
  meaningContains = '',
  srsLevel = 0,
  srsLevelLt = 0,
  srsLevelGt = 0,
} = {}) => get(
  reviewsUrl,
  {
    level,
    offset,
    limit,
    meaning_contains: meaningContains,
    srs_level: srsLevel,
    srs_level_lt: srsLevelLt,
    srs_level_gt: srsLevelGt,
  }
);

export const getCriticalReviews = ({ offset = 0, limit = 100 } = {}) =>
  get(criticalReviewsUrl, { offset, limit });

export const getCurrentReviews = ({ offset = 0, limit = 100 } = {}) =>
  get(currentReviewsUrl, { offset, limit });

export const getReviewEntry = (id) => get(reviewEntryUrl(id));
export const reviewCorrect = (id) => post(reviewCorrectUrl(id));
export const reviewIncorrect = (id) => post(reviewIncorrectUrl(id));
export const hideReview = (id) => post(hideReviewUrl(id));
export const unhideReview = (id) => post(unhideReviewUrl(id));

//-----------------------------------------------------------------------------
//  SYNONYMS
//-----------------------------------------------------------------------------
export const addSynonym = ({ id, character, kana }) =>
  post(synonymUrl, { character, kana, review: id });

export const removeSynonym = (id) => del(synonymEntryUrl(id));

//-----------------------------------------------------------------------------
//  VOCABULARY
//-----------------------------------------------------------------------------
export const getVocabulary = ({
  level,
  offset = 0,
  limit = 100,
  meaningContains = '',
  readingsKanaContains = '',
  readingsCharacterContains = '',
} = {}) => get(
  vocabularyUrl,
  {
    level,
    offset,
    limit,
    meaning_contains: meaningContains,
    readings_kana_contains: readingsKanaContains,
    readings_character_contains: readingsCharacterContains,
  }
);

export const getLevels = () => get(levelsUrl);
export const getLevel = ({
  level,
  offset = 0,
  limit = 100,
  hyperlink = false,
} = {}) => get(
  vocabularyUrl,
  {
    level,
    offset,
    limit,
    hyperlink,
  }
);

export const getVocabularyEntry = (id) => get(vocabularyEntryUrl(id));

export const getReadings = ({ offset = 0, limit = 100 } = {}) =>
  get(readingUrl, { offset, limit });

export const getReadingEntry = (id) => get(readingEntryUrl(id));

export const lockLevel = (level) => post(lockLevelUrl(level));
export const unlockLevel = (level) => post(unlockLevelUrl(level));

//-----------------------------------------------------------------------------
//  GENERAL
//-----------------------------------------------------------------------------
export const getFaqs = () => get(faqUrl);
export const getFaq = (id) => get(faqEntryUrl(id));
export const addFaq = ({ question, answer }) => post(faqUrl, { question, answer });
export const updateFaq = ({ question, answer }) => put(faqUrl, { question, answer });

export const getAnnouncements = () => get(announcementUrl);
export const getAnnouncement = (id) => get(announcementEntryUrl(id));
export const addAnnouncement = ({ title, body }) => post(announcementUrl, { title, body });
export const updateAnnouncement = ({ title, body }) => put(announcementUrl, { title, body });

export const sendContactMessage = ({
  name,
  email,
  body = 'No body provided',
} = {}) =>
  post(contactUrl, { name, email, body });
