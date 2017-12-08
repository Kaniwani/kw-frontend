import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { compose, pure, withStateHandlers } from 'recompose';

import { selectVocabularySettings } from 'shared/selectors';
import KanjiStroke from 'components/KanjiStroke';
import IconButton from 'components/IconButton';

import { greyLight } from 'shared/styles/colors';
import { Wrapper, Text } from './styles';

StrokeLoader.propTypes = {
  character: PropTypes.string.isRequired,
  showKanjiSvg: PropTypes.bool.isRequired,
  toggleKanjiSvg: PropTypes.func.isRequired,
};

function StrokeLoader({ showKanjiSvg, character, toggleKanjiSvg }) {
  return (
    <Wrapper>
      {showKanjiSvg ? renderKanjiStroke(character) : renderLoadButton(toggleKanjiSvg)}
    </Wrapper>
  );
}

// avoids xhr if not called
function renderKanjiStroke(character = '') {
  return <KanjiStroke character={character} />;
}

function renderLoadButton(toggleKanjiSvg) {
  return (
    <IconButton
      name="BRUSH"
      title="View stroke diagram"
      plainButton={false}
      bgColor={greyLight}
      colorHover={greyLight}
      onClick={toggleKanjiSvg}
      data-ignore-hotkeys
    >
      <Text lang="ja">筆順</Text>
    </IconButton>
  );
}

const mapStateToProps = (state, props) => ({
  settings: createSelector(
    selectVocabularySettings,
    (settings) => Object.assign({}, settings.kanjiStroke, props.settings)
  )(state),
});

export default compose(
  connect(mapStateToProps),
  withStateHandlers(() => ({ showKanjiSvg: false }), {
    toggleKanjiSvg: () => () => ({ showKanjiSvg: true }),
  }),
  pure,
)(StrokeLoader);
