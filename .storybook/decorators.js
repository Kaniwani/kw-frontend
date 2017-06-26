import React from 'react';
import ReactToolTip from 'react-tooltip';
import { MemoryRouter } from 'react-router-dom';

export const withToolTip = (story) => (
  <div>
    <ReactToolTip id="globalTooltip" />
    {story()}
  </div>
);

export const withRouter = (story) => (
  <MemoryRouter initialEntries={['/']}>
    {story()}
  </MemoryRouter>
);
