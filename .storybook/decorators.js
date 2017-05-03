import React from 'react';

import PageWrapper from 'layouts/PageWrapper';
import Container from 'layouts/Container';
import Element from 'layouts/Element';

export const withPageWrapper = (story) => <PageWrapper>{story()}</PageWrapper>;
export const withContainer = (story) => <Container>{story()}</Container>;
export const withElement = (story) => <Element>{story()}</Element>;
