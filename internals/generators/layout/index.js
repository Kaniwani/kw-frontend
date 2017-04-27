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
    },
  ],
  actions: () => {
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

    return actions;
  },
};
