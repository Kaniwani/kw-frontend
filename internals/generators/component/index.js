/**
 * Component Generator
 */

/* eslint strict: ["off"] */

"use strict";

const componentExists = require("../utils/componentExists");

module.exports = {
  description: "Add an unconnected component",
  prompts: [
    {
      type: "list",
      name: "type",
      message: "Select the type of component",
      default: "Stateless Function",
      choices: () => ["Stateless Function", "React.PureComponent", "React.Component"],
    },
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
    {
      type: "confirm",
      name: "wantLoadable",
      default: false,
      message: "Do you want to load the component asynchronously?",
    },
  ],
  actions: (data) => {
    // Generate index.js and index.test.js
    let componentTemplate;

    switch (data.type) {
      case "Stateless Function": {
        componentTemplate = "./component/stateless.js.hbs";
        break;
      }
      default: {
        componentTemplate = "./component/class.js.hbs";
      }
    }

    const actions = [
      {
        type: "add",
        path: "../../app/components/{{properCase name}}/index.js",
        templateFile: componentTemplate,
        abortOnFail: true,
      },
      {
        type: "add",
        path: "../../app/components/{{properCase name}}/__tests__/index.test.js",
        templateFile: "./component/test.js.hbs",
        abortOnFail: true,
      },
    ];

    if (data.wantFixtures) {
      actions.push(
        {
          type: "add",
          category: "components",
          path:
            "../../app/components/{{properCase name}}/__fixtures__/allProps.fixture.js",
          templateFile: "../fixture/allProps.js.hbs",
          abortOnFail: true,
        },
        {
          type: "add",
          category: "components",
          path:
            "../../app/components/{{properCase name}}/__fixtures__/requiredProps.fixture.js",
          templateFile: "../fixture/requiredProps.js.hbs",
          abortOnFail: true,
        }
      );
    }

    if (data.wantLoadable) {
      actions.push({
        type: "add",
        path: "../../app/components/{{properCase name}}/Loadable.js",
        templateFile: "./component/loadable.js.hbs",
        abortOnFail: true,
      });
    }

    return actions;
  },
};
