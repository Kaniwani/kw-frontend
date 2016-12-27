import { configure } from '@kadira/storybook';

const reqComponents = require.context('../app/components', true, /.stories.js$/);
const reqMainStories = require.context('./', true, /.stories.js$/);

function loadStories() {
  reqComponents.keys().forEach((filename) => reqComponents(filename));
  reqMainStories.keys().forEach((filename) => reqMainStories(filename));
}

configure(loadStories, module);
