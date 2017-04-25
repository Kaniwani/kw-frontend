import React from 'react';

import Wrapper from 'components/Wrapper';
import Container from 'components/Container';
import Element from 'components/Element';

export const withWrapper = (story) => <Wrapper>{story()}</Wrapper>;
export const withContainer = (story) => <Container>{story()}</Container>;
export const withElement = (story) => <Element>{story()}</Element>;
