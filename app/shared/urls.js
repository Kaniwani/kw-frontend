//-----------------------------------------------------------------------------
//  KW API
//-----------------------------------------------------------------------------
import urljoin from 'url-join';

const BASE_URL = '//localhost:8000';
const AUTH_BASE = urljoin(BASE_URL, 'auth');
const API_BASE = urljoin(BASE_URL, 'api', 'v1');

//-----------------------------------------------------------------------------
//  AUTHORIZATION
//-----------------------------------------------------------------------------
export const auth = urljoin(AUTH_BASE);
export const userLogin = urljoin(API_BASE, 'auth', 'login');
export const userCredentials = urljoin(auth, 'me'); // GET / PATCH
export const register = urljoin(auth, 'register'); // POST
export const activate = urljoin(auth, 'activate'); // POST
export const username = urljoin(auth, 'username'); // POST
export const password = urljoin(auth, 'password'); // POST
export const passwordReset = urljoin(password, 'reset'); // POST
export const passwordConfirm = urljoin(passwordReset, 'confirm'); // POST

//-----------------------------------------------------------------------------
//  USER
//-----------------------------------------------------------------------------
export const user = urljoin(API_BASE, 'user'); // GET all users (if admin, else 'me')
export const userProfile = urljoin(user, 'me'); // GET user profile
export const userSrs = urljoin(user, 'srs'); // POST to get review count
export const userSync = urljoin(user, 'sync'); // POST to sync with WK

//-----------------------------------------------------------------------------
//  REVIEWS
//-----------------------------------------------------------------------------
export const reviews = urljoin(API_BASE, 'review'); // GET all ready reviews
export const criticalReviews = urljoin(reviews, 'critical'); // GET critical
export const currentReviews = urljoin(reviews, 'current'); // GET current review queue
export const reviewEntry = (id) => urljoin(reviews, id); // GET single
export const reviewCorrect = (id) => urljoin(reviewEntry(id), 'correct'); // POST correct answer
export const reviewIncorrect = (id) => urljoin(reviewEntry(id), 'incorrect'); // POST incorrect answer
export const hideReview = (id) => urljoin(reviewEntry(id), 'hide'); // POST
export const unhideReview = (id) => urljoin(reviewEntry(id), 'unhide'); // POST

//-----------------------------------------------------------------------------
//  SYNONYMS
//-----------------------------------------------------------------------------
export const synonym = urljoin(API_BASE, 'synonym'); // POST add, GET get all
export const synonymEntry = (id) => urljoin(synonym, id); // DELETE remove, GET one

//-----------------------------------------------------------------------------
//  VOCABULARY
//-----------------------------------------------------------------------------
export const vocabulary = urljoin(API_BASE, 'vocabulary'); // GET everything!
export const vocabularyEntry = (id) => urljoin(vocabulary, id); // GET one
export const reading = urljoin(API_BASE, 'reading'); // Get all
export const readingEntry = (id) => urljoin(reading, id); // GET one
export const level = urljoin(API_BASE, 'level'); // GET all
export const levelEntry = (id) => urljoin(level, id); // GET one
export const lockLevel = (id) => urljoin(levelEntry(id), 'lock'); // POST lock
export const unlockLevel = (id) => urljoin(levelEntry(id), 'unlock'); // POST unlock

//-----------------------------------------------------------------------------
//  GENERAL
//-----------------------------------------------------------------------------
export const faq = urljoin(API_BASE, 'faq');
export const faqEntry = (id) => urljoin(faq, id);
export const announcement = urljoin(API_BASE, 'announcement');
export const announcementEntry = (id) => urljoin(announcement, id);
export const contact = urljoin(API_BASE, 'contact');

//-----------------------------------------------------------------------------
//  EXTERNAL
//-----------------------------------------------------------------------------
export const createJishoApiUrl = (keyword) => `//jisho.org/api/v1/search/words?keyword=${keyword}`;
export const createJishoUrl = (keyword) => `//jisho.org/search/${keyword}`;
