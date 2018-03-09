import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { selectWord } from 'features/vocab/selectors';
import { selectKanjiStrokeSettings } from 'features/user/selectors';

import Toggle from 'common/components/Toggle';
import Button from 'common/components/Button';
import Icon from 'common/components/Icon';
import KanjiStroke from '../KanjiStroke';

import { purple, white } from 'common/styles/colors';
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
          <Button
            lang="ja"
            title="View Stroke Diagram"
            plainButton={false}
            color={white[0]}
            bgColorHover={white[0]}
            colorHover={purple[1]}
            bgColor={purple[1]}
            onClick={toggle}
            data-ignore-hotkeys
          >
            <Text lang="ja">筆順</Text>
            <Icon name="BRUSH" />
          </Button>
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
