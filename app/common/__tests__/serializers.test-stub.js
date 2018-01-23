import userBody, { userBodyAlternate } from 'common/data/api/user';
import userFixture, { userFixtureAlternate } from 'common/data/fixtures/user';
import announcementsBody from 'common/data/api/announcements';
import announcementsFixture from 'common/data/fixtures/announcements';
import levelsBody from 'common/data/api/levels';
import levelsFixture from 'common/data/fixtures/levels';

import {
  serializeUserResponse,
  serializeAnnouncementsResponse,
  serializeLevelsResponse,
} from 'common/serializers';

// FIXME: remove randomization from fixtures
// TODO: generate data -> fixtures with serializers, then test serializer(api) against fixture,
// so assuming we update the saved api data we can determine any changes that way

describe('serializers', () => {
  describe('userResponse', () => {
    it('serialized response matches fixture', () =>
      expect(serializeUserResponse(userBody)).toEqual(userFixture));
    it('serialized alternate values response matches fixture', () =>
      expect(serializeUserResponse(userBodyAlternate)).toEqual(userFixtureAlternate));
  });
  describe('announcementResponse', () => {
    it('serialized response matches fixture', () =>
      expect(serializeAnnouncementsResponse(announcementsBody)).toEqual(announcementsFixture));
  });
  describe('levelsResponse', () => {
    it('serialized response matches fixture', () =>
      expect(serializeLevelsResponse(levelsBody)).toEqual(levelsFixture));
  });
});
