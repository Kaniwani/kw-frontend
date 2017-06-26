import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import SiteHeader from 'components/SiteHeader';
import HomePage from 'containers/HomePage/Loadable';
import ReviewsPage from 'containers/ReviewsPage/Loadable';
import VocabularyPage from 'containers/VocabularyPage/Loadable';
import AboutPage from 'containers/AboutPage/Loadable';
import ContactPage from 'containers/ContactPage/Loadable';
import SettingsPage from 'containers/SettingsPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import { loadUser } from 'containers/App/actions';

export class ProtectedRoutes extends React.Component {
  static propTypes = {
    loadUser: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadUser();
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
    loadUser: () => dispatch(loadUser()),
  };
}

export default withRouter(connect(null, mapDispatchToProps)(ProtectedRoutes));
