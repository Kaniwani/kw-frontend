import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import ScrollToTop from 'components/ScrollToTop';
import SiteHeader from 'containers/SiteHeader/Loadable';
import SiteFooter from 'components/SiteFooter/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import VocabLevelsPage from 'containers/VocabLevelsPage/Loadable';
import VocabLevelPage from 'containers/VocabLevelPage/Loadable';
import VocabEntryPage from 'containers/VocabEntryPage/Loadable';
import QuizPage from 'containers/QuizPage/Loadable';
import QuizSummaryPage from 'containers/QuizSummaryPage/Loadable';
import AboutPage from 'containers/AboutPage/Loadable';
import ContactPage from 'containers/ContactPage/Loadable';
import SettingsPage from 'containers/SettingsPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import { app } from 'containers/App/actions';
import styled from 'styled-components';
const Page = styled.div`
  display: flex;
  flex: 1 0 100%;
  flex-flow: column nowrap;
  & > header,
  & > footer {
    flex: 0 0 auto;
  }

  & > main {
    flex: 1 0 auto;
  }
`;

export class ProtectedRoutes extends React.Component {
  static propTypes = {
    loadUser: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <Page>
        <ReactTooltip id="globalTooltip" />
        {/* Notifications */}
        <ScrollToTop />
        <Switch>
          <Route path="/:path(lessons|reviews)" /* don't render SiteHeader */ />
          <Route path="" component={SiteHeader} />
        </Switch>
        <main>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/contact" component={ContactPage} />
            <Route exact path="/settings" component={SettingsPage} />
            <Route path="/:category(lessons|reviews)">
              <Switch>
                <Route exact path="/:category/session" component={QuizPage} />
                <Route exact path="/:category" component={QuizSummaryPage} />
                <Route path="" component={NotFoundPage} />
              </Switch>
            </Route>
            <Route exact path="/vocabulary" component={VocabLevelsPage} />
            <Route exact path="/vocabulary/levels" component={VocabLevelsPage} />
            <Route exact path="/vocabulary/levels/:id" component={VocabLevelPage} />
            <Route exact path="/vocabulary/entry/:id" component={VocabEntryPage} />
            <Route path="" component={NotFoundPage} />
          </Switch>
        </main>
        <Switch>
          <Route path="/:path(lessons|reviews)" /* don't render SiteFooter */ />
          <Route path="" component={SiteFooter} />
        </Switch>
      </Page>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(app.user.load.request()),
});

// NOTE: location not passed to connected components if we don't use withRouter
// could change to ConnectedSwitch using selectLocation instead though
// see https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(null, mapDispatchToProps)(ProtectedRoutes));
