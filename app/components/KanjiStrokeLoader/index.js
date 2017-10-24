import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, withStateHandlers } from 'recompose';

import KanjiStroke from 'components/KanjiStroke';
import IconButton from 'components/IconButton';

import { greyLight } from 'shared/styles/colors';
import { Wrapper, Text } from './styles';

// avoids xhr if not called
const renderKanjiStroke = (character = '') => (
  <KanjiStroke character={character} />
);

StrokeLoader.propTypes = {
  character: PropTypes.string.isRequired,
  showKanjiSvg: PropTypes.bool.isRequired,
  toggleKanjiSvg: PropTypes.func.isRequired,
};

function StrokeLoader({ character, toggleKanjiSvg, showKanjiSvg }) {
  return (
    <Wrapper>
      {showKanjiSvg ? (
        renderKanjiStroke(character)
      ) : (
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
      )}
    </Wrapper>
  );
}

export default compose(
  withStateHandlers(() => ({ showKanjiSvg: false }), {
    toggleKanjiSvg: () => () => ({ showKanjiSvg: true }),
  }),
  pure,
)(StrokeLoader);
