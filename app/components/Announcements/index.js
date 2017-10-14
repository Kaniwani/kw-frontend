import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cuid from 'cuid';

import { createStructuredSelector } from 'reselect';

import app from 'components/App/actions';
import { selectAnnouncements } from 'components/App/selectors';

import Announcement from './Announcement';

class Announcements extends React.PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
    getAnnouncements: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getAnnouncements();
  }

  render() {
    return (
      <div>
        {this.props.items.map((item) => <Announcement key={cuid()} {...item} />)}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  items: selectAnnouncements,
});

const mapDispatchToProps = ({
  getAnnouncements: app.announcements.load.request,
});

export default connect(mapStateToProps, mapDispatchToProps)(Announcements);
