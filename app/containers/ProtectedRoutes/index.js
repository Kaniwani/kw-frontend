import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import SiteHeader from 'components/SiteHeader';
import HomePage from 'containers/HomePage/Loadable';
import ReviewsPage from 'containers/ReviewsPage/Loadable';
import VocabularyPage from 'containers/VocabularyPage/Loadable';
import AboutPage from 'containers/AboutPage/Loadable';
import ContactPage from 'containers/ContactPage/Loadable';
import SettingsPage from 'containers/SettingsPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import { userProfileSerializer, stubbedReviewEntriesSerializer } from 'shared/serializers';

import { loadUser, loadReviews } from './actions';

export class ProtectedRoutes extends React.Component {
  static propTypes = {
    loadUser: PropTypes.func.isRequired,
    loadReviews: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadUser();
      // .then((res) => {
      //   this.setState(userProfileSerializer(res));
      // }) // eslint-disable-line no-console
      // .catch((err) => console.error(err)); // eslint-disable-line no-console

    // this.props.loadReviews()
    //   .then((res) => {
    //     this.setState({ reviews: stubbedReviewEntriesSerializer(res) });
    //   }) // eslint-disable-line no-console
    //   .catch((err) => console.error(err)); // eslint-disable-line no-console
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/:path(lessons|reviews)" /* render nothing */ />
          <Route path="" component={SiteHeader} />
        </Switch>
        <ReactTooltip id="globalTooltip" />
        {/* Notifications */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/contact" component={ContactPage} />
          <Route exact path="/settings" component={SettingsPage} />
          {/* TODO: handle token clear logout action in redirect or in SiteHeader link */}
          <Redirect exact path="/logout" to="/welcome" />
          {/* <Route path="/lessons" component={LessonsPage} /> */}
          <Route path="/reviews" component={ReviewsPage} />
          <Route path="/vocabulary" component={VocabularyPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadUser: () => dispatch(loadUser),
    loadReviews: () => dispatch(loadReviews),
  };
}

export default connect(null, mapDispatchToProps)(ProtectedRoutes);
