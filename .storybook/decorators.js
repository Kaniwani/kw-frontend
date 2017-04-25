import React from 'react';

import Wrapper from 'layouts/Wrapper';
import Container from 'layouts/Container';
import Element from 'layouts/Element';

export const withWrapper = (story) => <Wrapper>{story()}</Wrapper>;
export const withContainer = (story) => <Container>{story()}</Container>;
export const withElement = (story) => <Element>{story()}</Element>;
