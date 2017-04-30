import request from 'utils/request';
import * as urls from './urls';

//-----------------------------------------------------------------------------
//  AUTHORIZATION
//-----------------------------------------------------------------------------
export function getUserAuth(body = {
  id: 0,
  username: 'No username provided',
  email: 'No email provided',
}) {
  const url = urls.userCredentials;
  return request.get({ url, body });
}

export function loginUser(body = {
  username: 'No username provided',
  password: 'No email provided',
}) {
  const url = urls.userLogin;
  return request.post({ url, body });
}

export function updateUserAuth(body = {
  id: 0,
  username: 'No username provided',
  email: 'No email provided',
}) {
  const url = urls.userCredentials;
  return request.patch({ url, body });
}

export function registerUser(body = {
  api_key: 0, // Required
  username: 'No username provided', // Required
  password: 'No password provided', // Required
  email: 'No email provided',
}) {
  const url = urls.register;
  return request.post({ url, body });
}

export function activateUser(body = {
  uid: 'No uid provided', // Required
  token: 'No token provided', // Required
}) {
  const url = urls.activate;
  return request.post({ url, body });
}

export function changeUsername(body = { username: 'No username provided' }) {
  const url = urls.username;
  return request.post({ url, body });
}

export function changePassword(body = { password: 'No password provided' }) {
  const url = urls.password;
  return request.post({ url, body });
}

// send email to user with password reset link.
export function passwordReset(body = { email: 'No email provided' /* Required */ }) {
  const url = urls.passwordReset;
  return request.post({ url, body });
}

// endpoint to finish reset password process
export function passwordConfirm(body) {
  const url = urls.passwordConfirm;
  return request.post({ url, body });
}

//-----------------------------------------------------------------------------
//  USER
//-----------------------------------------------------------------------------
export function getUsers(body) {
  const url = urls.user;
  return request.get({ url, body });
}

export function getUserProfile(body) {
  const url = urls.userProfile;
  return request.get({ url, body });
}

export function syncKw(body) {
  const url = urls.userSrs;
  return request.post({ url, body });
}

export function syncWk(body = {
  full_sync: false, // true to force ALL users to sync with WK
}) {
  const url = urls.userSync;
  return request.post({ url, body });
}

//-----------------------------------------------------------------------------
//  REVIEWS
//-----------------------------------------------------------------------------
export function getReviews(body = {
  meaning_contains: '',
  level: 0,
  srs_level: 0,
  srs_level_lt: 0,
  srs_level_gt: 0,
  offset: 0,
  limit: 100,
}) {
  const url = urls.reviews;
  return request.get({ url, body });
}

export function getCriticalReviews(body = {
  offset: 0,
  limit: 100,
}) {
  const url = urls.criticalReviews;
  return request.get({ url, body });
}

export function getCurrentReviews(body = {
  offset: 0,
  limit: 100,
}) {
  const url = urls.currentReviews;
  return request.get({ url, body });
}

export function getReviewEntry(body = {}) {
  const url = urls.reviewEntry(body.id);
  delete body.id; // eslint-disable-line no-param-reassign
  return request.get({ url, body });
}

export function reviewCorrect(body = {}) {
  const url = urls.reviewCorrect(body.id);
  delete body.id; // eslint-disable-line no-param-reassign
  return request.post({ url, body });
}

export function reviewIncorrect(body = {}) {
  const url = urls.reviewIncorrect(body.id);
  delete body.id; // eslint-disable-line no-param-reassign
  return request.post({ url, body });
}

export function hideReview(body = {}) {
  const url = urls.hideReview(body.id);
  delete body.id; // eslint-disable-line no-param-reassign
  return request.post({ url, body });
}

export function unhideReview(body = {}) {
  const url = urls.unhideReview(body.id);
  delete body.id; // eslint-disable-line no-param-reassign
  return request.post({ url, body });
}

//-----------------------------------------------------------------------------
//  SYNONYMS
//-----------------------------------------------------------------------------
export function getSynonym(body = {}) {
  const url = urls.synonymEntry(body.id);
  delete body.id; // eslint-disable-line no-param-reassign
  return request.get({ url, body });
}

export function getSynonyms(body) {
  const url = urls.synonym;
  return request.get({ url, body });
}

export function addSynonym(body) {
  const url = urls.synonym;
  return request.post({ url, body });
}

export function removeSynonym(body = {}) {
  const url = urls.synonymEntry(body.id);
  delete body.id; // eslint-disable-line no-param-reassign
  return request.delete({ url, body });
}

//-----------------------------------------------------------------------------
//  VOCABULARY
//-----------------------------------------------------------------------------
export function getVocabulary(body = {
  level: 0,
  meaning_contains: '',
  readings_kana_contains: '',
  readings_character_contains: '',
  offset: 0,
  limit: 100,
}) {
  const url = urls.vocabulary;
  return request.get({ url, body });
}

export function getVocabularyEntry(body = { id: 0 }) {
  const url = urls.vocabularyEntry(body.id);
  delete body.id; // eslint-disable-line no-param-reassign
  return request.get({ url, body });
}

export function getReadings(body = {
  offset: 0,
  limit: 100,
}) {
  const url = urls.reading;
  return request.get({ url, body });
}

export function getReadingEntry(body = { id: 0 }) {
  const url = urls.readingEntry(body.id);
  delete body.id; // eslint-disable-line no-param-reassign
  return request.get({ url, body });
}

export function getLevels(body) {
  const url = urls.levels;
  return request.get({ url, body });
}

export function getLevelVocabulary(body = {
  level: 0,
  offset: 0,
  limit: 100,
  hyperlink: false,
}) {
  const url = urls.vocabulary;
  return request.get({ url, body }); // creates queryString using body.level
}

export function lockLevel(body = {
  level: null,
}) {
  const url = urls.lockLevel(body.level);
  delete body.level; // eslint-disable-line no-param-reassign
  return request.post({ url, body });
}

export function unlockLevel(body = {
  level: null,
  count: null, // for partial x items lock/unlock
}) {
  const url = urls.unlockLevel(body.level);
  delete body.level; // eslint-disable-line no-param-reassign
  return request.post({ url, body });
}

//-----------------------------------------------------------------------------
//  GENERAL
//-----------------------------------------------------------------------------
export function getFaqs(body) {
  const url = urls.faq;
  return request.get({ url, body });
}

export function getFaqEntry(body = { id: 0 }) {
  const url = urls.faqEntry(body.id);
  delete body.id; // eslint-disable-line no-param-reassign
  return request.get({ url, body });
}

export function addFaqEntry(body = {
  id: null,
  question: '', // Required
  answer: '', // Required
}) {
  const url = urls.faqEntry(body.id);
  delete body.id; // eslint-disable-line no-param-reassign
  return request.get({ url, body });
}

export function getAnnouncements(body) {
  const url = urls.announcement;
  return request.get({ url, body });
}

export function getAnnouncement(body = { id: 0 }) {
  const url = urls.announcementEntry(body.id);
  delete body.id; // eslint-disable-line no-param-reassign
  return request.get({ url, body });
}

export function addAnnouncement(body = {
  title: '', // Required
  body: '', // Required
}) {
  const url = urls.announcementEntry(body);
  return request.post({ url, body });
}

export function contact(body = {
  name: 'No name provided', // Required
  email: 'No email provided', // Required
  body: 'No body provided', // Required
}) {
  const url = urls.contact;
  return request.post({ url, body });
}
