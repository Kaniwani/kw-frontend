import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { compose, withHandlers, mapProps } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { KEYCODES } from 'shared/constants';
import { PANELS } from './constants';
import multiLogin from './actions';
import { selectActivePanel, selectRegisterSelected, selectResetSelected } from './selectors';

import {
  SelectWrapper,
  SelectList,
  SelectListItem,
  SelectedPointer,
} from './styles';

FormSelector.propTypes = {
  activePanel: PropTypes.oneOf(PANELS).isRequired,
  setActivePanel: PropTypes.func.isRequired,
  registerSelected: PropTypes.bool.isRequired,
  resetSelected: PropTypes.bool.isRequired,
};

const EnhancedSelectListItem = compose(
  withHandlers({
    setActivePanel: ({ setActivePanel, panel }) => () => {
      setActivePanel(panel);
    },
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

function FormSelector({ activePanel, setActivePanel, registerSelected, resetSelected }) {
  return (
    <SelectWrapper>
      <SelectList plainList>
        {PANELS.map((PANEL) => (
          <EnhancedSelectListItem
            key={cuid()}
            panel={PANEL}
            isActive={activePanel === PANEL}
            setActivePanel={setActivePanel}
            tabIndex={activePanel === PANEL ? -1 : 0}
          >
            {PANEL}
          </EnhancedSelectListItem>
        ))}
      </SelectList>
      <SelectedPointer position={(registerSelected && 'left') || (resetSelected && 'right')} />
    </SelectWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  activePanel: selectActivePanel,
  registerSelected: selectRegisterSelected,
  resetSelected: selectResetSelected,
});

const mapDispatchToProps = ({
  setActivePanel: multiLogin.setActivePanel,
});

export default connect(mapStateToProps, mapDispatchToProps)(FormSelector);
