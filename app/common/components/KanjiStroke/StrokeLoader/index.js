import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { selectWord } from 'features/vocab/selectors';
import { selectKanjiStrokeSettings } from 'features/user/selectors';

import Aux from 'common/components/Aux';
import Toggle from 'common/components/Toggle';
import IconButton from 'common/components/IconButton';
import KanjiStroke from '../KanjiStroke';

import { grey } from 'common/styles/colors';
import { gutter } from 'common/styles/layout';

// prettier-ignore
export const Text = styled.div`
  /* slightly nicer centering otherwise too far left due to button min-width & 2 char text */
  ${gutter({ position: 'left', mod: 1.5 })}
  ${gutter({ position: 'right', mod: 2 })}
  /* bump kanji size */
  font-size: 1.3em;
`;

StrokeLoader.propTypes = {
  word: PropTypes.string.isRequired,
  settings: PropTypes.object,
};

StrokeLoader.defaultProps = {
  settings: {},
};

export function StrokeLoader({ word, settings }) {
  return (
    <Toggle
      render={({ on, toggle }) =>
        on ? (
          renderKanjiStroke({ word, settings })
        ) : (
          <IconButton
            lang="ja"
            name="BRUSH"
            title="View stroke diagram"
            plainButton={false}
            bgColor={grey[2]}
            colorHover={grey[2]}
            onClick={toggle}
            data-ignore-hotkeys
            render={({ Icon }) => (
              <Aux>
                <Text lang="ja">筆順</Text>
                {Icon}
              </Aux>
            )}
          />
        )
      }
    />
  );
}

// avoids xhr if not called in Toggle render ternary condition
function renderKanjiStroke(props) {
  return <KanjiStroke {...props} />;
}

const mapStateToProps = (state, props) => ({
  word: selectWord(state, props),
  settings: selectKanjiStrokeSettings(state, props),
});

export default connect(mapStateToProps)(StrokeLoader);
