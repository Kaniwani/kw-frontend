import { configure, addDecorator } from '@storybook/react';
import { withRouter } from './decorators';
import '../app/global-styles';

const reqMainStories = require.context('./', true, /.stories.js$/);
const reqBase = require.context('base', true, /.stories.js$/);
const reqComponents = require.context('components', true, /.stories.js$/);
const reqContainers = require.context('containers', true, /.stories.js$/);
const reqLayouts = require.context('layouts', true, /.stories.js$/);

function loadStories() {
  reqMainStories.keys().forEach(filename => reqMainStories(filename));
  reqBase.keys().forEach(filename => reqBase(filename));
  reqComponents.keys().forEach(filename => reqComponents(filename));
  reqContainers.keys().forEach(filename => reqContainers(filename));
  reqLayouts.keys().forEach(filename => reqLayouts(filename));
}

addDecorator(withRouter);
configure(loadStories, module);
