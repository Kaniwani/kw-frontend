import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import VocabLevelsPage from 'containers/VocabLevelsPage/Loadable';
import VocabLevelPage from 'containers/VocabLevelPage/Loadable';
import VocabEntryPage from 'containers/VocabEntryPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

function VocabularyPage() {
  return (
    <div>
      <Switch>
        <Route exact path="/vocabulary" component={VocabLevelsPage} />
        <Route exact path="/vocabulary/level/:level" component={VocabLevelPage} />
        <Route exact path="/vocabulary/entry/:id" component={VocabEntryPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(VocabularyPage);
