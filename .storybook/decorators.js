import React from 'react';
import Section from '../app/components/Section';
import Wrapper from '../app/components/Wrapper';
import Element from '../app/components/Element';
import background from '../app/shared/assets/img/backgrounds/home.jpg';

export const withCenterByMargin = (story) => <Section>{story()}</Section>;
export const withCenterByPadding = (story) => <Section fullWidth>{story()}</Section>;
export const withCenterFullWidthBg = (story) => <Section backgroundImg={background} fullWidthBg>{story()}</Section>;
export const withWrapper = (story) => <Wrapper>{story()}</Wrapper>;
export const withElement = (story) => <Element>{story()}</Element>;
