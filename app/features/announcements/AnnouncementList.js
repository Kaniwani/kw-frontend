import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import cuid from 'cuid';

import announcements from './actions';
import {
  selectAnnouncementIds,
  selectAnnouncementsIsLoading,
  selectAnnouncementsShouldLoad,
} from './selectors';

import Spinner from 'common/components/Spinner';
import Toggle from 'common/components/Toggle';

import Ul from 'common/components/Ul';
import Button from 'common/components/Button';
import Announcement from './Announcement';

AnnouncementList.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export function AnnouncementList({ ids }) {
  const recent = ids.slice(0, 5);
  const old = ids.slice(recent.length);
  const hasOld = !!old.length;

  return (
    <Toggle
      render={({ on, toggle }) => {
        const idsToShow = on ? recent.concat(old) : recent;
        return (
          <Fragment>
            <Ul
              plainList
              style={{
                display: 'flex',
                flexFlow: 'column nowrap',
                textAlign: 'center',
              }}
            >
              {idsToShow.map((id) => <Announcement key={cuid()} id={id} />)}
            </Ul>
            {hasOld && !on && <Button onClick={toggle}>View All</Button>}
          </Fragment>
        );
      }}
    />
  );
}

const mapStateToProps = createStructuredSelector({
  shouldLoad: selectAnnouncementsShouldLoad,
  isLoading: selectAnnouncementsIsLoading,
  ids: selectAnnouncementIds,
});

const mapDispatchToProps = {
  load: announcements.load.request,
};

class AnnouncementListContainer extends React.Component {
  static propTypes = {
    ids: PropTypes.array.isRequired,
    shouldLoad: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    load: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.shouldLoad) {
      this.props.load();
    }
  }

  render() {
    return this.props.isLoading ? <Spinner /> : <AnnouncementList ids={this.props.ids} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementListContainer);
