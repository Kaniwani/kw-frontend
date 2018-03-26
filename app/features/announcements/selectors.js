import { createSelector } from 'reselect';
import { isBefore, addMinutes, parse } from 'date-fns';
import dateOrFalse from 'common/utils/dateOrFalse';
import { getState, getBy, makeSelectItemIds, makeSelectItemById } from 'common/selectors';

export const UI_DOMAIN = 'announcements';
export const ENTITY_DOMAIN = 'announcements';
export const selectAnnouncementsUi = getState(UI_DOMAIN, {});
export const selectAnnouncementEntities = getState(['entities', ENTITY_DOMAIN], {});

const getAnHourAgo = () => addMinutes(new Date(), -60);

export const selectAnnouncementsLoading = createSelector(
  selectAnnouncementsUi,
  getState('isLoading', false)
);
export const selectAnnouncementsLastLoad = createSelector(
  selectAnnouncementsUi,
  getBy('lastLoad', dateOrFalse)
);

export const selectAnnouncementsShouldLoad = createSelector(
  [selectAnnouncementsLoading, selectAnnouncementsLastLoad, getAnHourAgo],
  (isLoading, lastLoad, anHourAgo) => {
    if (isLoading) {
      return false;
    }
    return !lastLoad || isBefore(parse(lastLoad), anHourAgo);
  }
);
export const selectAnnouncementIds = makeSelectItemIds(selectAnnouncementEntities);
export const selectAnnouncements = selectAnnouncementEntities;
export const selectAnnouncementById = makeSelectItemById(selectAnnouncements);

export default selectAnnouncementEntities;
