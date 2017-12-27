// import { createSelector } from "reselect";
import { isBefore, addDays, parse } from "date-fns";

import {
  makeSelectEntityDomain,
  makeSelectDomainShouldLoad,
  makeSelectItemIds,
  makeSelectItemById,
} from "common/selectors";

export const UI_DOMAIN = "announcements";
export const ENTITY_DOMAIN = "announcements";
export const selectAnnouncementsDomain = makeSelectEntityDomain(ENTITY_DOMAIN);

const shouldLoad = ({ isLoading, lastLoad }) => {
  if (isLoading) {
    return false;
  }
  const yesterday = addDays(new Date(), -1);
  return !lastLoad || isBefore(parse(lastLoad), yesterday);
};

export const selectAnnouncementsShouldLoad = makeSelectDomainShouldLoad(UI_DOMAIN, shouldLoad);
export const selectAnnouncementIds = makeSelectItemIds(selectAnnouncementsDomain);
export const selectAnnouncements = selectAnnouncementsDomain;
export const selectAnnouncementById = makeSelectItemById(selectAnnouncements);

export default selectAnnouncementsDomain;
