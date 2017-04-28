/**
 * Layout Generator
 */

/* eslint strict: ["off"] */

'use strict';

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a layout component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: (value) => {
        if ((/.+/).test(value)) {
          return componentExists(value) ? 'A component or container with this name already exists' : true;
        }

        return 'The name is required';
      },
    }, {
      type: 'confirm',
      name: 'wantStories',
      default: true,
      message: 'Do you want storybook stories?',
    },
  ],
  actions: (data) => {
    // Generate index.js and index.test.js
    const layoutTemplate = './layout/stateless.js.hbs';

    const actions = [{
      type: 'add',
      path: '../../app/layouts/{{properCase name}}/index.js',
      templateFile: layoutTemplate,
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../../app/layouts/{{properCase name}}/tests/index.test.js',
      templateFile: './layout/test.js.hbs',
      abortOnFail: true,
    }];

    if (data.wantStories) {
      actions.push({
        type: 'add',
        path: '../../app/layouts/{{properCase name}}/stories/index.stories.js',
        templateFile: './layout/stories.js.hbs',
        abortOnFail: true,
      });
    }

    return actions;
  },
};
