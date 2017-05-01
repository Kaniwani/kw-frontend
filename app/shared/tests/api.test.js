import * as API from '../api';

// TODO: real tests!
// NOTE: these will all get called by actions/sagas,
// so we could potentially let the testing be done there

// http://facebook.git.skiphub.io/jest/docs/asynchronous.html#promises
describe('API', () => {
  it.skip('getUserAuth()', () => API.getUserAuth().then((data) => {
    expect(data).toMatchSnapshot();
  }));

  it.skip('loginUser()', () => {
    expect(API.loginUser()).toMatchSnapshot();
  });

  it.skip('updateUserAuth()', () => {
    expect(API.updateUserAuth()).toMatchSnapshot();
  });

  it.skip('registerUser()', () => {
    expect(API.registerUser()).toMatchSnapshot();
  });

  it.skip('activateUser()', () => {
    expect(API.activateUser()).toMatchSnapshot();
  });

  it.skip('changeUsername()', () => {
    expect(API.changeUsername()).toMatchSnapshot();
  });

  it.skip('changePassword()', () => {
    expect(API.changePassword()).toMatchSnapshot();
  });

  it.skip('passwordReset()', () => {
    expect(API.passwordReset()).toMatchSnapshot();
  });

  it.skip('passwordConfirm()', () => {
    expect(API.passwordConfirm()).toMatchSnapshot();
  });

  it.skip('getUsers()', () => {
    expect(API.getUsers()).toMatchSnapshot();
  });

  it.skip('getUserProfile()', () => {
    expect(API.getUserProfile()).toMatchSnapshot();
  });

  it.skip('syncKw()', () => {
    expect(API.syncKw()).toMatchSnapshot();
  });

  it.skip('syncWk()', () => {
    expect(API.syncWk()).toMatchSnapshot();
  });

  it.skip('getReviews()', () => {
    expect(API.getReviews()).toMatchSnapshot();
  });

  it.skip('getCrit.skipicalReviews()', () => {
    expect(API.getCrit.skipicalReviews()).toMatchSnapshot();
  });

  it.skip('getCurrentReviews()', () => {
    expect(API.getCurrentReviews()).toMatchSnapshot();
  });

  it.skip('getReviewEntry()', () => {
    expect(API.getReviewEntry()).toMatchSnapshot();
  });

  it.skip('reviewCorrect()', () => {
    expect(API.reviewCorrect()).toMatchSnapshot();
  });

  it.skip('reviewIncorrect()', () => {
    expect(API.reviewIncorrect()).toMatchSnapshot();
  });

  it.skip('hideReview()', () => {
    expect(API.hideReview()).toMatchSnapshot();
  });

  it.skip('unhideReview()', () => {
    expect(API.unhideReview()).toMatchSnapshot();
  });

  it.skip('getSynonym()', () => {
    expect(API.getSynonym()).toMatchSnapshot();
  });

  it.skip('getSynonyms()', () => {
    expect(API.getSynonyms()).toMatchSnapshot();
  });

  it.skip('addSynonym()', () => {
    expect(API.addSynonym()).toMatchSnapshot();
  });

  it.skip('removeSynonym()', () => {
    expect(API.removeSynonym()).toMatchSnapshot();
  });

  it.skip('getVocabulary()', () => {
    expect(API.getVocabulary()).toMatchSnapshot();
  });

  it.skip('getVocabularyEntry()', () => {
    expect(API.getVocabularyEntry()).toMatchSnapshot();
  });

  it.skip('getReadings()', () => {
    expect(API.getReadings()).toMatchSnapshot();
  });

  it.skip('getReadingEntry()', () => {
    expect(API.getReadingEntry()).toMatchSnapshot();
  });

  it.skip('getLevels()', () => {
    expect(API.getLevels()).toMatchSnapshot();
  });

  it.skip('getLevelVocabulary()', () => {
    expect(API.getLevelVocabulary()).toMatchSnapshot();
  });

  it.skip('lockLevel()', () => {
    expect(API.lockLevel()).toMatchSnapshot();
  });

  it.skip('unlockLevel()', () => {
    expect(API.unlockLevel()).toMatchSnapshot();
  });

  it.skip('getFaqs()', () => {
    expect(API.getFaqs()).toMatchSnapshot();
  });

  it.skip('getFaqEntry()', () => {
    expect(API.getFaqEntry()).toMatchSnapshot();
  });

  it.skip('addFaqEntry()', () => {
    expect(API.addFaqEntry()).toMatchSnapshot();
  });

  it.skip('getAnnouncements()', () => {
    expect(API.getAnnouncements()).toMatchSnapshot();
  });

  it.skip('getAnnouncement()', () => {
    expect(API.getAnnouncement()).toMatchSnapshot();
  });

  it.skip('addAnnouncement()', () => {
    expect(API.addAnnouncement()).toMatchSnapshot();
  });

  it.skip('contact()', () => {
    expect(API.contact()).toMatchSnapshot();
  });
});
