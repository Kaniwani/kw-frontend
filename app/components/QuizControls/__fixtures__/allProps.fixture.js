import React from 'react';
import QuizControls, { ControlButton } from 'components/QuizControls';

export default {
  component: QuizControls,
  props: {},
  children: [
    <ControlButton onClick={() => window.alert('Clicked Button 1')}>Button 1</ControlButton>,
    <ControlButton onClick={() => window.alert('Clicked Button 2')}>Button 2</ControlButton>,
    <ControlButton onClick={() => window.alert('Clicked Disabled Button')}>Disabled Button</ControlButton>,
  ],
};
