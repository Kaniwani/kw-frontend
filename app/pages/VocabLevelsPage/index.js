import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from 'shared/actions';
import { selectLevelIds } from 'shared/selectors';

import View from './View';

export class VocabLevelsPage extends React.Component {
  static propTypes = {
    loadLevels: PropTypes.func.isRequired,
    levelIds: PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.props.loadLevels();
  }

  render() {
    return <View {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  levelIds: selectLevelIds(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadLevels: () => dispatch(actions.levels.load.request()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabLevelsPage);
