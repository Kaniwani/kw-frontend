import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';
import { compose, pure, withHandlers, mapProps } from 'recompose';
import { KEYCODES } from 'shared/constants';

import { SelectWrapper, SelectList, SelectListItem, SelectedPointer } from './styles';

const EnhancedSelectListItem = compose(
  withHandlers({
    setActivePanel: ({ setActivePanel, panel }) => () => { setActivePanel(panel); },
    handlePanelKeydown: ({ setActivePanel, panel }) => ({ keyCode }) => {
      if (keyCode === KEYCODES.SPACE || keyCode === KEYCODES.ENTER) {
        setActivePanel(panel);
      }
    },
  }),
  mapProps(({ setActivePanel, handlePanelKeydown, ...props }) => ({
    onClick: setActivePanel,
    onKeyDown: handlePanelKeydown,
    ...props,
  })),
)(SelectListItem);

FormSelector.propTypes = {
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

// export default pure(FormSelector);
export default FormSelector;
