import React from 'react';
import { storiesOf } from '@storybook/react';
import BackgroundImg from '../index';

storiesOf('components.BackgroundImg', module)
  .add('single with defaults: bgPosition `center center` and bgSize `cover`', () => (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <BackgroundImg imgSrc="http://fillmurray.com/1600/1200" />
    </div>
  ))
  .add('single with: bgPosition `top left` and bgSize `contain`', () => (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <BackgroundImg
        imgSrc="http://fillmurray.com/1600/1200"
        bgSize="contain"
        bgPosition="top left"
      />
    </div>
  ));
