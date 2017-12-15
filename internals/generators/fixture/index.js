/**
 * Base Generator
 */

/* eslint strict: ["off"] */

"use strict";

const componentExists = require("../utils/componentExists");

module.exports = {
  description: "Add fixtures to existing component",
  prompts: [
    {
      type: "input",
      name: "category",
      message: "Which component category are you adding to (base/components/containers)?",
      default: "components",
      validate: (value) =>
        /^base|components|containers$/.test(value) ? true : "Invalid category",
    },
    {
      type: "input",
      name: "name",
      message: "Which component are you adding to?",
      default: "MyComponent",
      validate: (value) => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? true
            : "No components with this name already exist.";
        }

        return "Check component name or generate a full component via npm run generate and select yes when asked to add cosmos fixtures.";
      },
    },
  ],
  actions: () => {
    const actions = [
      {
        type: "add",
        path:
          "../../app/{{ category }}/{{properCase name}}/__fixtures__/allProps.fixture.js",
        templateFile: "./fixture/allProps.js.hbs",
        abortOnFail: true,
      },
      {
        type: "add",
        path:
          "../../app/{{ category }}/{{properCase name}}/__fixtures__/requiredProps.fixture.js",
        templateFile: "./fixture/requiredProps.js.hbs",
        abortOnFail: true,
      },
    ];

    return actions;
  },
};
