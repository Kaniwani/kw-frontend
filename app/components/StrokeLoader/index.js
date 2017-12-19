import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';

import Aux from "base/Aux";
import Toggle from "components/Toggle";
import KanjiStroke from "components/KanjiStroke";
import IconButton from "components/IconButton";

import { greyLight } from "shared/styles/colors";
import { gutter } from 'shared/styles/layout';

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

function StrokeLoader({ word, settings }) {
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
            bgColor={greyLight}
            colorHover={greyLight}
            onClick={toggle}
            data-ignore-hotkeys
            render={({ Icon }) => (
              <Aux>
                <Text lang="ja">筆順</Text>
                {Icon}
              </Aux>
            )}
          >
          </IconButton>
        )
      }
    />
  );
}

// avoids xhr if not called
function renderKanjiStroke(props) {
  return <KanjiStroke {...props} />;
}

export default StrokeLoader;
