import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import app from 'shared/actions';
import { selectUi, selectProfile, selectAnnouncements } from 'shared/selectors';

import View from './View';

export class HomePage extends React.PureComponent {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    announcements: PropTypes.arrayOf(PropTypes.object).isRequired,
    isLoading: PropTypes.bool.isRequired,
    loadUser: PropTypes.func.isRequired,
    loadAnnouncements: PropTypes.func.isRequired,
  }

  componentDidMount() {
    if (!this.props.isLoading) {
      this.props.loadUser();
      this.props.loadAnnouncements();
    }
  }

  render() {
    return <View {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  profile: selectProfile(state),
  announcements: selectAnnouncements(state),
  isLoading: selectUi(state).user.loading,
});

const mapDispatchToProps = {
  loadUser: app.user.load.request,
  loadAnnouncements: app.announcements.load.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
