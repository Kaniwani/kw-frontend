import { createSelector } from 'reselect';
import { isBefore, addDays, parse } from 'date-fns';

import { getState, makeSelectItemIds, makeSelectItemById } from 'common/selectors';

export const UI_DOMAIN = 'announcements';
export const ENTITY_DOMAIN = 'announcements';
export const selectAnnouncementsUi = getState(UI_DOMAIN, {});
export const selectAnnouncementEntities = getState(['entities', ENTITY_DOMAIN], {});

const shouldLoad = ({ isLoading, lastLoad }) => {
  if (isLoading) {
    return false;
  }
  const yesterday = addDays(new Date(), -1);
  return !lastLoad || isBefore(parse(lastLoad), yesterday);
};

export const selectAnnouncementsShouldLoad = createSelector(selectAnnouncementsUi, shouldLoad);
export const selectAnnouncementsIsLoading = createSelector(
  selectAnnouncementsUi,
  getState('isLoading', false)
);
export const selectAnnouncementIds = makeSelectItemIds(selectAnnouncementEntities);
export const selectAnnouncements = selectAnnouncementEntities;
export const selectAnnouncementById = makeSelectItemById(selectAnnouncements);

export default selectAnnouncementEntities;
