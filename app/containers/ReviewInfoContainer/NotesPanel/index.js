import React from 'react';
import { branch, renderNothing } from 'recompose';

import { PanelWrapper } from '../styles';

function NotesPanel() {
  return (
    <PanelWrapper>
      <div>Coming soon...</div>
    </PanelWrapper>
  );
}

const hideIfNotActive = branch(({ isActive }) => !isActive, renderNothing);

export default hideIfNotActive(NotesPanel);
