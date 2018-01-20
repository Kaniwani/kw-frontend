import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import cuid from 'cuid';

import announcements from './actions';
import { UI_DOMAIN, selectAnnouncementIds, selectAnnouncementsShouldLoad } from './selectors';

import Loader from 'common/components/Loader';
import Toggle from 'common/components/Toggle';
import Aux from 'common/components/Aux';
import Ul from 'common/components/Ul';
import Button from 'common/components/Button';
import Announcement from './Announcement';

Announcements.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export function Announcements({ ids }) {
  const recent = ids.slice(0, 5);
  const old = ids.slice(recent.length);
  const hasOld = !!old.length;

  return (
    <Toggle
      render={({ on, toggle }) => {
        const idsToShow = on ? recent.concat(old) : recent;
        return (
          <Aux>
            <Ul plainList>{idsToShow.map((id) => <Announcement key={cuid()} id={id} />)}</Ul>
            {hasOld && !on && <Button onClick={toggle}>View All</Button>}
          </Aux>
        );
      }}
    />
  );
}

const mapStateToProps = createStructuredSelector({
  ids: selectAnnouncementIds,
});

function AnnouncementsContainer(props) {
  return (
    <Loader
      uiDomain={UI_DOMAIN}
      selectShouldLoad={selectAnnouncementsShouldLoad}
      load={announcements.load.request}
      render={({ isLoading, Spinner }) => (isLoading ? <Spinner /> : <Announcements {...props} />)}
    />
  );
}

export default connect(mapStateToProps)(AnnouncementsContainer);
