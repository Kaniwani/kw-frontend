import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';
import { compose, withHandlers, mapProps } from 'recompose';
import { KEYCODES } from 'common/constants';

import { SelectWrapper, SelectList, SelectListItem, SelectedPointer } from './styles';

const EnhancedSelectListItem = compose(
  withHandlers({
    setActivePanel: ({ setActivePanel, panel }) => () => { setActivePanel(panel); },
    onPanelKeyDown: ({ setActivePanel, panel }) => ({ keyCode }) => {
      if (keyCode === KEYCODES.SPACE || keyCode === KEYCODES.ENTER) {
        setActivePanel(panel);
      }
    },
  }),
  mapProps(({ setActivePanel, onPanelKeyDown, ...props }) => ({
    onClick: setActivePanel,
    onKeyDown: onPanelKeyDown,
    ...props,
  })),
)(SelectListItem);

FormSelector.propTypes = {
  panels: PropTypes.arrayOf(PropTypes.string).isRequired,
  activePanel: PropTypes.string.isRequired,
  setActivePanel: PropTypes.func.isRequired,
  registerSelected: PropTypes.bool.isRequired,
  resetSelected: PropTypes.bool.isRequired,
};

function FormSelector({ panels, activePanel, setActivePanel, registerSelected, resetSelected }) {
  return (
    <SelectWrapper>
      <SelectList plainList>
        {panels.map((panel) => (
          <EnhancedSelectListItem
            key={cuid()}
            panel={panel}
            isActive={activePanel === panel}
            setActivePanel={setActivePanel}
            tabIndex={activePanel === panel ? -1 : 0}
          >
            {panel}
          </EnhancedSelectListItem>
        ))}
      </SelectList>
      <SelectedPointer position={(registerSelected && 'left') || (resetSelected && 'right')} />
    </SelectWrapper>
  );
}

export default FormSelector;
