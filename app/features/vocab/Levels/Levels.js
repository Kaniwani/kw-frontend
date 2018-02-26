import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cuid from 'cuid';

import Spinner from 'common/components/Spinner';
import { vocab } from 'features/vocab/actions';
import { selectVocabLevelIds, selectShouldLoad, selectLastLoad } from './selectors';

import LevelLink from './LevelLink';
import { List } from './styles';

LevelList.propTypes = {
  ids: PropTypes.array.isRequired,
};

export function LevelList({ ids }) {
  return <List>{ids.map((id) => <LevelLink key={cuid()} id={id} />)}</List>;
}

const mapStateToProps = (state, props) => ({
  ids: selectVocabLevelIds(state),
  lastLoad: selectLastLoad(state, props),
  shouldLoad: selectShouldLoad(state, props),
});

const mapDispatchToProps = (dispatch, props) => ({
  loadLevels: () => dispatch(vocab.levels.load.request(props)),
});

export class VocabLevelsContainer extends React.Component {
  static propTypes = {
    ids: PropTypes.array.isRequired,
    lastLoad: PropTypes.any.isRequired,
    shouldLoad: PropTypes.bool.isRequired,
    loadLevels: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.shouldLoad) {
      this.props.loadLevels();
    }
  }

  render() {
    return !this.props.lastLoad ? <Spinner /> : <LevelList {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VocabLevelsContainer);
