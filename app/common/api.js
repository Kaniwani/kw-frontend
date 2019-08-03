// polyfills for older brwosers
import 'url-search-params-polyfill';

import wretch from 'wretch';
import { getToken } from 'common/utils/auth';
import { API_BASE } from 'common/constants';

const options = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const api = wretch(API_BASE, options).errorType('json');

export const user = {
  fetchQuizCounts: () => api
    .auth(`JWT ${getToken()}`)
    .url(`review/counts/`)
    .get()
    .json(),

  fetch: () => api
    .auth(`JWT ${getToken()}`)
    .url('user/me/')
    .get()
    .json(),

  fetchProfile: (id) => api
    .auth(`JWT ${getToken()}`)
    .url(`profile/${id}`)
    .get()
    .json(),

  // { email, username, password, api_key_v2 }
  register: (data) => api
    .auth('')
    .url('auth/users/create/')
    .json(data)
    .post()
    .json(),

  // { username, password }
  login: (data) => api
    .auth('')
    .url('auth/login/')
    .json(data)
    .post()
    .json(),

  // { username }
  changeUsername: (data) => api
    .auth(`JWT ${getToken()}`)
    .url('auth/username/')
    .json(data)
    .post()
    .json(),

  // { password }
  changePassword: (data) => api
    .auth(`JWT ${getToken()}`)
    .url('auth/password/')
    .json(data)
    .post()
    .json(),

  // { email }
  resetPassword: (data) => api
    .url('auth/password/reset/')
    .json(data)
    .post()
    .res(),

  // { uid, token, new_password }
  confirmResetPassword: (data) => api
    .url(`auth/password/reset/confirm/`)
    .json(data)
    .post()
    .res(),

  // deserialize entire profile state
  update: (data) => api
    .auth(`JWT ${getToken()}`)
    .url(`profile/${data.id}/`)
    .json(data)
    .patch()
    .json(),

  // { level }
  resetProgress: (data) => api
    .auth(`JWT ${getToken()}`)
    .url('user/reset/')
    .json(data)
    .post()
    .json(),
};

export const announcements = {
  fetchAll: () => api
    .auth(`JWT ${getToken()}`)
    .url('announcement/')
    .get()
    .json(),

  // { title, body, pub_date }
  create: (data) => api
    .auth(`JWT ${getToken()}`)
    .url('announcement/')
    .json(data)
    .post()
    .json(),

  remove: ({ id }) => api
    .auth(`JWT ${getToken()}`)
    .url('announcement/')
    .url(`/${id}/`)
    .delete()
    .res(),
};

export const contact = {
  // { name, email, body }
  send: (data) => api
    .auth(`JWT ${getToken()}`)
    .url('contact/')
    .json(data)
    .post()
    .res(),
};

export const faq = {
  fetchAll: () => api
    .auth(`JWT ${getToken()}`)
    .url('faq/')
    .get()
    .json(),

  // { question, answer }
  create: (data) => api
    .auth(`JWT ${getToken()}`)
    .url('faq/')
    .json(data)
    .post()
    .json(),
};

export const vocab = {
  // { level, offset, limit, meaning_contains, reading_contains }
  search: (params) => api
    .auth(`JWT ${getToken()}`)
    .url('vocabulary/')
    .query(params)
    .get()
    .json(),

  fetch: ({ id }) => api
    .auth(`JWT ${getToken()}`)
    .url(`vocabulary/${id}/`)
    .get()
    .json(),

  level: {
    fetchAll: () => api
      .auth(`JWT ${getToken()}`)
      .url('level/')
      .get()
      .json(),

    fetch: ({ id }) => api
      .auth(`JWT ${getToken()}`)
      .url(`level/${id}/`)
      .get()
      .json(),

    lock: ({ id }) => api
      .auth(`JWT ${getToken()}`)
      .url(`level/${id}/lock/`)
      .post()
      .json(),

    unlock: ({ id }) => api
      .auth(`JWT ${getToken()}`)
      .url(`level/${id}/unlock/`)
      .post()
      .json(),
  },
};

export const queue = {
  // { limit }
  fetch: {
    lessons: (params) => api
      .auth(`JWT ${getToken()}`)
      .url('review/lesson/')
      .query(params)
      .get()
      .json(),

    reviews: (params) => api
      .auth(`JWT ${getToken()}`)
      .url('review/current/')
      .query(params)
      .get()
      .json(),
  },
};

export const quiz = {
  record: ({ id, isCorrect, previouslyIncorrect }) => {
    const body = {
      user_specific_id: id,
      user_correct: isCorrect,
      wrong_before: previouslyIncorrect,
    };
    const slug = isCorrect ? 'correct' : 'incorrect';
    return api
      .auth(`JWT ${getToken()}`)
      .url(`review/${id}/${slug}/`)
      .json(body)
      .post()
      .json();
  },
};

export const review = {
  fetch: ({ id }) => api
    .auth(`JWT ${getToken()}`)
    .url(`review/${id}/`)
    .get()
    .json(),

  hide: ({ id }) => api
    .auth(`JWT ${getToken()}`)
    .url(`review/${id}/hide/`)
    .post()
    .res(),

  unhide: ({ id }) => api
    .auth(`JWT ${getToken()}`)
    .url(`review/${id}/unhide/`)
    .post()
    .res(),

  reset: ({ id }) => api
    .auth(`JWT ${getToken()}`)
    .url(`review/${id}/reset/`)
    .post()
    .res(),

  update: ({ id, ...payload }) => api
    .auth(`JWT ${getToken()}`)
    .url(`review/${id}/`)
    .json(payload)
    .patch()
    .json(),
};

export const synonym = {
  // { review, character, kana }
  create: (data) => api
    .auth(`JWT ${getToken()}`)
    .url('synonym/reading/')
    .json(data)
    .post()
    .json(),

  remove: ({ id }) => api
    .auth(`JWT ${getToken()}`)
    .url(`synonym/reading/${id}/`)
    .delete()
    .res(),
};

export const reviews = {
  // { level, offset, limit, meaning_contains, srs_level, srs_level_lt, srs_level_gt }
  search: (params) => api
    .auth(`JWT ${getToken()}`)
    .url('review/')
    .query(params)
    .get()
    .json(),

  // { offset, limit }
  fetchCritical: (params) => api
    .auth(`JWT ${getToken()}`)
    .url('review/critical/')
    .query(params)
    .get()
    .json(),
};

export const report = {
  // { reason, reading }
  create: (params) => api
    .auth(`JWT ${getToken()}`)
    .url('report/')
    .json(params)
    .post()
    .json(),

  fetchAll: () => {
    api
      .auth(`JWT ${getToken()}`)
      .url('report/')
      .get()
      .json();
  },
};

//-----------------------------------------------------------------------------
//  EXTERNAL ROUTES
//-----------------------------------------------------------------------------
export const createJishoUrl = (keyword) => `https://jisho.org/search/${keyword}`;
export const createKotobankUrl = (keyword) => `https://kotobank.jp/jeword/${encodeURIComponent(keyword)}`;
export const createWeblioUrl = (keyword) => `https://ejje.weblio.jp/content/${encodeURIComponent(keyword)}`;
export const createForvoUrl = (keyword) => `https://forvo.com/search/${encodeURIComponent(keyword)}/`;
export const createWkVocabUrl = (keyword) => `https://wanikani.com/vocabulary/${encodeURIComponent(keyword)}`;
export const createEijiroUrl = (keyword, useEijiroProLink) => `https://${useEijiroProLink ? 'eowpf' : 'eow'}.alc.co.jp/search?q=${encodeURIComponent(keyword)}`;
