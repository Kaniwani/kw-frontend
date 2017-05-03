import React from 'react';
import ReactToolTip from 'react-tooltip';

import PageWrapper from 'layouts/PageWrapper';
import Container from 'layouts/Container';
import Element from 'layouts/Element';

export const withToolTip = (story) => (
  <div>
    <ReactToolTip id="globalTooltip" />
    {story()}
  </div>
);
export const withPageWrapper = (story) => <PageWrapper>{story()}</PageWrapper>;
export const withContainer = (story) => <Container>{story()}</Container>;
export const withElement = (story) => <Element>{story()}</Element>;
