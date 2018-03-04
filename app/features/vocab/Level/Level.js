import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import vocab from 'features/vocab/actions';

import { selectShouldLoad, selectLastLoad } from './selectors';

import {
  selectVocabLevelReviewIds,
  selectVocabLevelIsLocked,
} from 'features/vocab/Levels/selectors';

import Aux from 'common/components/Aux';
import Spinner from 'common/components/Spinner';
import Element from 'common/components/Element';
import H1 from 'common/components/H1';
import Toggle from 'common/components/Toggle';
import VocabListToggleButton from 'common/components/VocabListToggleButton';
import VocabList, { ITEM_TYPES } from 'common/components/VocabList';
import Notice from './Notice';

VocabLevel.propTypes = {
  id: PropTypes.number.isRequired,
  reviewIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  isLocked: PropTypes.bool.isRequired,
};

export function VocabLevel({ id, reviewIds, isLocked }) {
  const title = `Level ${id}`;
  return (
    <Toggle
      defaultOn
      render={({ on, toggle }) => (
        <Aux>
          <Element flexRow alignItems="center">
            <H1>{title}</H1>
            <VocabListToggleButton cardsExpanded={on} onToggle={toggle} />
          </Element>
          <Notice ids={reviewIds} isLocked={isLocked} />
          <VocabList
            ids={reviewIds}
            heading={title}
            itemType={on ? ITEM_TYPES.CARD : ITEM_TYPES.CHIP}
            withSrsColors
          />
        </Aux>
      )}
    />
  );
}

const mapStateToProps = (state, props) => ({
  reviewIds: selectVocabLevelReviewIds(state, props),
  isLocked: selectVocabLevelIsLocked(state, props),
  lastLoad: selectLastLoad(state, props),
  shouldLoad: selectShouldLoad(state, props),
});

const mapDispatchToProps = (dispatch, props) => ({
  loadLevel: () => dispatch(vocab.level.load.request(props)),
});

export class VocabLevelContainer extends React.Component {
  static propTypes = {
    reviewIds: PropTypes.array.isRequired,
    isLocked: PropTypes.bool.isRequired,
    lastLoad: PropTypes.any.isRequired,
    shouldLoad: PropTypes.bool.isRequired,
    loadLevel: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.shouldLoad) {
      this.props.loadLevel();
    }
  }

  render() {
    return !this.props.lastLoad ? <Spinner /> : <VocabLevel {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VocabLevelContainer);
