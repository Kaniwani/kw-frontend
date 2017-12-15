/**
 * Base Generator
 */

/* eslint strict: ["off"] */

"use strict";

const componentExists = require("../utils/componentExists");

module.exports = {
  description: "Add a base component",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "What should it be called?",
      default: "Button",
      validate: (value) => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? "A component or container with this name already exists"
            : true;
        }

        return "The name is required";
      },
    },
    {
      type: "confirm",
      name: "wantFixtures",
      default: true,
      message: "Do you want cosmos fixtures?",
    },
  ],
  actions: (data) => {
    // Generate index.js and index.test.js
    const baseTemplate = "./base/stateless.js.hbs";

    const actions = [
      {
        type: "add",
        path: "../../app/base/{{properCase name}}/index.js",
        templateFile: baseTemplate,
        abortOnFail: true,
      },
      {
        type: "add",
        path: "../../app/base/{{properCase name}}/__tests__/index.test.js",
        templateFile: "./base/test.js.hbs",
        abortOnFail: true,
      },
    ];

    if (data.wantFixtures) {
      actions.push(
        {
          type: "add",
          category: "base",
          path: "../../app/base/{{properCase name}}/__fixtures__/allProps.fixture.js",
          templateFile: "../fixture/allProps.js.hbs",
          abortOnFail: true,
        },
        {
          type: "add",
          category: "base",
          path:
            "../../app/base/{{properCase name}}/__fixtures__/requiredProps.fixture.js",
          templateFile: "../fixture/requiredProps.js.hbs",
          abortOnFail: true,
        }
      );
    }

    return actions;
  },
};
