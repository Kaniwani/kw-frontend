import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import cuid from 'cuid';

import announcements from './actions';
import { selectAnnouncementIds } from './selectors';

import Toggle from 'common/components/Toggle';

import Ul from 'common/components/Ul';
import Button from 'common/components/Button';
import Announcement from './Announcement';

class AnnouncementList extends React.Component {
  static propTypes = {
    ids: PropTypes.array.isRequired,
    load: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.load();
  }

  render() {
    const { ids } = this.props;
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
}

const mapStateToProps = createStructuredSelector({
  ids: selectAnnouncementIds,
});

const mapDispatchToProps = {
  load: announcements.load.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementList);
