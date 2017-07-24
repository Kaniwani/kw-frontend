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
const currentLessonsUrl = urljoin(reviewsUrl, 'lesson'); // GET current lesson queue
const reviewEntryUrl = (id) => urljoin(reviewsUrl, id); // GET single
const reviewCorrectUrl = (id) => urljoin(reviewEntryUrl(id), 'correct'); // POST correct answer
const reviewIncorrectUrl = (id) => urljoin(reviewEntryUrl(id), 'incorrect'); // POST incorrect answer
const lockReviewUrl = (id) => urljoin(reviewEntryUrl(id), 'hide'); // POST
const unlockReviewUrl = (id) => urljoin(reviewEntryUrl(id), 'unhide'); // POST

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
const levelEntryUrl = (id) => urljoin(levelsUrl, id); // GET one
const lockLevelUrl = (id) => urljoin(levelEntryUrl(id), 'lock'); // POST lock
const unlockLevelUrl = (id) => urljoin(levelEntryUrl(id), 'unlock'); // POST unlock

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


//-----------------------------------------------------------------------------
//  AUTHORIZATION
//-----------------------------------------------------------------------------
export const getUserAuth = ({ id, username, email } = {}) => get(userCredentialsUrl, { id, username, email });
export const loginUser = ({ username, password } = {}) => post(userLoginUrl, { username, password });
export const updateUserAuth = ({ id, username, email } = {}) => patch(userCredentialsUrl, { id, username, email });
export const registerUser = ({ email, username, password, apiKey } = {}) =>
  post(registerUrl, { email, username, password, api_key: apiKey });

export const activateUser = ({ uid } = {}) => post(activateUrl, { uid });
export const changeUsername = ({ username } = {}) => post(usernameUrl, { username });
export const changePassword = ({ password } = {}) => post(passwordUrl, { password });
export const resetPassword = ({ email } = {}) => post(resetPasswordUrl, { email }); // send password reset email.
export const confirmPassword = () => post(confirmPasswordUrl); // finish reset password process

//-----------------------------------------------------------------------------
//  USER
//-----------------------------------------------------------------------------
export const getUsers = () => get(userUrl);
export const getUserProfile = () => get(userProfileUrl);
export const syncKw = () => post(userSrsUrl);
// true to force ALL users to sync with WK
export const syncWk = ({ fullSync = false } = {}) => post(userSyncUrl, { full_sync: fullSync });

//-----------------------------------------------------------------------------
//  REVIEWS
//-----------------------------------------------------------------------------
export const getReviews = ({
  id,
  offset,
  limit,
  meaningContains,
  srsLevel,
  srsLevelLt,
  srsLevelGt,
} = {}) => get(
  reviewsUrl,
  {
    level: id,
    offset,
    limit,
    meaning_contains: meaningContains,
    srs_level: srsLevel,
    srs_level_lt: srsLevelLt,
    srs_level_gt: srsLevelGt,
  }
);

export const getCriticalReviews = ({ offset, limit } = {}) => get(criticalReviewsUrl, { offset, limit });
export const getCurrentReviews = ({ offset, limit } = {}) => get(currentReviewsUrl, { offset, limit });
export const getCurrentLessons = ({ offset, limit } = {}) => get(currentLessonsUrl, { offset, limit });

export const getReviewEntry = ({ id }) => get(reviewEntryUrl(id));
export const recordReview = ({ id, isCorrect, previouslyIncorrect }) => {
  const body = {
    user_specific_id: id,
    user_correct: isCorrect,
    wrong_before: previouslyIncorrect,
  };
  return isCorrect ? post(reviewCorrectUrl(id), body) : post(reviewIncorrectUrl(id), body);
};

export const lockReview = ({ id }) => post(lockReviewUrl(id));
export const unlockReview = ({ id }) => post(unlockReviewUrl(id));
export const saveReviewNotes = ({ id, notes }) => patch(reviewEntryUrl(id), { notes });

//-----------------------------------------------------------------------------
//  SYNONYMS
//-----------------------------------------------------------------------------
export const addSynonym = ({ reviewId, character, kana } = {}) => post(
  synonymUrl,
  { review: reviewId, character, kana },
);
export const removeSynonym = ({ id }) => del(synonymEntryUrl(id));

//-----------------------------------------------------------------------------
//  VOCABULARY
//-----------------------------------------------------------------------------
export const getVocabulary = ({
  id: level,
  offset,
  limit,
  meaningContains,
  readingsKanaContains,
  readingsCharacterContains,
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

export const getVocabularyEntry = ({ id }) => get(vocabularyEntryUrl(id));

export const getReadings = ({ offset, limit } = {}) => get(readingUrl, { offset, limit });
export const getReadingEntry = ({ id }) => get(readingEntryUrl(id));

export const lockLevel = ({ id }) => post(lockLevelUrl(id));
export const unlockLevel = ({ id }) => post(unlockLevelUrl(id));

//-----------------------------------------------------------------------------
//  GENERAL
//-----------------------------------------------------------------------------
export const getFaqs = () => get(faqUrl);
export const getFaq = ({ id }) => get(faqEntryUrl(id));
export const addFaq = ({ question, answer } = {}) => post(faqUrl, { question, answer });
export const updateFaq = ({ question, answer } = {}) => put(faqUrl, { question, answer });

export const getAnnouncements = () => get(announcementUrl);
export const getAnnouncement = ({ id }) => get(announcementEntryUrl(id));
export const addAnnouncement = ({ title, body } = {}) => post(announcementUrl, { title, body });
export const updateAnnouncement = ({ title, body } = {}) => put(announcementUrl, { title, body });

export const sendContactMessage = ({ name, email, body } = {}) => post(contactUrl, { name, email, body });
