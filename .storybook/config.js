import { configure } from '@kadira/storybook';

function loadStories() {
  require('../stories'); // eslint-disable-line global-require
}

configure(loadStories, module);
