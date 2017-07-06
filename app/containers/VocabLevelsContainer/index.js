import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { branch, renderNothing } from 'recompose';

import VocabLevelList from 'components/VocabLevelList';
import * as globalActions from 'containers/App/actions';
import { makeSelectUser } from 'containers/App/selectors';
import makeSelectVocabLevelsContainer from './selectors';

export class VocabLevelsContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    user: PropTypes.object,
    levels: PropTypes.array,
    lockLevel: PropTypes.func.isRequired,
    unlockLevel: PropTypes.func.isRequired,
  }

  // FIXME: fixme! have to pass which level was clicked somehow
  handleLevelLock(level) {
    if (level.locked) {
      this.props.unlockLevel(level.level);
    } else {
      this.props.lockLevel(level.level);
    }
  }

  render() {
    return (
      <div>
        <VocabLevelList
          levels={this.props.levels}
          userWKLevel={this.props.user.currentLevel}
          handleLevelLock={this.handleLevelLock}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  vocabLevelsContainer: makeSelectVocabLevelsContainer(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    lockLevel: (level) => dispatch(globalActions.levelLockRequest(level)),
    unlockLevel: (level) => dispatch(globalActions.levelUnlockRequest(level)),
  };
}

const enhance = branch(
  ({ levels }) => !levels.length,
  renderNothing,
);

export default connect(mapStateToProps, mapDispatchToProps)(enhance(VocabLevelsContainer));
