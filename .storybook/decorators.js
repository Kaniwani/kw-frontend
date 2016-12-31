import React from 'react';
import Wrapper from '../app/components/Wrapper';
import Container from '../app/components/Container';
import Element from '../app/components/Element';

export const withWrapper = (story) => <Wrapper>{story()}</Wrapper>;
export const withContainer = (story) => <Container>{story()}</Container>;
export const withElement = (story) => <Element>{story()}</Element>;
