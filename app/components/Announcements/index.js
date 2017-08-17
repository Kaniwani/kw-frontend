import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import cuid from 'cuid';

import { createStructuredSelector } from 'reselect';

import app from 'containers/App/actions';
import { selectAnnouncements } from 'containers/App/selectors';

import Announcement from './Announcement';

class Announcements extends React.Component { // eslint-disable-line react/prefer-stateless-function
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

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Announcements);
