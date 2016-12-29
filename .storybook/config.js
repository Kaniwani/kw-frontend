import { configure } from '@kadira/storybook';

const reqComponents = require.context('../app/components', true, /.stories.js$/);
const reqContainers = require.context('../app/containers', true, /.stories.js$/);
const reqMainStories = require.context('./', true, /.stories.js$/);

function loadStories() {
  reqComponents.keys().forEach((filename) => reqComponents(filename));
  reqContainers.keys().forEach((filename) => reqContainers(filename));
  reqMainStories.keys().forEach((filename) => reqMainStories(filename));
}

configure(loadStories, module);
