import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import SiteHeader from 'containers/SiteHeader';
import HomePage from 'containers/HomePage/Loadable';
import VocabLevelsPage from 'containers/VocabLevelsPage/Loadable';
import VocabLevelPage from 'containers/VocabLevelPage/Loadable';
import VocabEntryPage from 'containers/VocabEntryPage/Loadable';
import SessionPage from 'containers/SessionPage/Loadable';
import SessionSummaryPage from 'containers/SessionSummaryPage/Loadable';
import AboutPage from 'containers/AboutPage/Loadable';
import ContactPage from 'containers/ContactPage/Loadable';
import SettingsPage from 'containers/SettingsPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import { app } from 'containers/App/actions';

export class ProtectedRoutes extends React.Component {
  static propTypes = {
    loadUser: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <div>
        <ReactTooltip id="globalTooltip" />
        {/* Notifications */}
        <Switch>
          <Route path="/:path(lessons|reviews)" /* don't render SiteHeader */ />
          <Route path="" component={SiteHeader} />
        </Switch>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/contact" component={ContactPage} />
          <Route exact path="/settings" component={SettingsPage} />
          <Redirect exact path="/logout" to="/welcome" />
          <Route path="/:category(lessons|reviews)">
            <Switch>
              <Route exact path="/:category/session" component={SessionPage} />
              <Route exact path="/:category" component={SessionSummaryPage} />
              <Route path="" component={NotFoundPage} />
            </Switch>
          </Route>
          <Route exact path="/vocabulary" component={VocabLevelsPage} />
          <Route exact path="/vocabulary/levels" component={VocabLevelsPage} />
          <Route exact path="/vocabulary/levels/:id" component={VocabLevelPage} />
          <Route exact path="/vocabulary/entry/:id" component={VocabEntryPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(app.user.load.request()),
});

// location not passed to connected components if we don't use withRouter
// see https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(null, mapDispatchToProps)(ProtectedRoutes));
