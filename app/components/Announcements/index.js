import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, branch, renderNothing } from 'recompose';

import { createStructuredSelector } from 'reselect';

import app from 'containers/App/actions';
import { selectAnnouncements } from 'containers/App/selectors';

import Debug from 'utils/Debug';

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
        <h1>Announcements</h1>
        <Debug value={this.props.items} />
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
  branch(({ items }) => items.length < 1, renderNothing),
);

export default enhance(Announcements);
