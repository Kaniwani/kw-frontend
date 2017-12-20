/**
 * Container Generator
 */

const componentExists = require("../utils/componentExists");

module.exports = {
  description: "Add a container component",
  prompts: [
    {
      type: "list",
      name: "type",
      message: "Select the base component type:",
      default: "Stateless Function",
      choices: () => ["Stateless Function", "React.PureComponent", "React.Component"],
    },
    {
      type: "input",
      name: "name",
      message: "What should it be called?",
      default: "Form",
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
      name: "wantHeaders",
      default: false,
      message: "Do you want headers?",
    },
    {
      type: "confirm",
      name: "wantFixtures",
      default: false,
      message: "Do you want cosmos fixtures?",
    },
    {
      type: "confirm",
      name: "wantActionsAndReducer",
      default: true,
      message: "Do you want an actions/selectors/reducer tuple for this container?",
    },
    {
      type: "confirm",
      name: "wantLogic",
      default: true,
      message:
        "Do you want redux-logic for asynchronous flows and intercepting actions? (e.g. fetching data, validation)",
    },
    {
      type: "confirm",
      name: "wantLoadable",
      default: true,
      message: "Do you want to load resources asynchronously?",
    },
  ],
  actions: (data) => {
    // Generate index.js and index.test.js
    var componentTemplate; // eslint-disable-line no-var

    switch (data.type) {
      case "Stateless Function": {
        componentTemplate = "./container/stateless.js.hbs";
        break;
      }
      default: {
        componentTemplate = "./container/class.js.hbs";
      }
    }

    const actions = [
      {
        type: "add",
        path: "../../app/containers/{{properCase name}}/index.js",
        templateFile: componentTemplate,
        abortOnFail: true,
      },
      {
        type: "add",
        path: "../../app/containers/{{properCase name}}/__tests__/index.test.js",
        templateFile: "./container/test.js.hbs",
        abortOnFail: true,
      },
    ];

    if (data.wantFixtures) {
      actions.push(
        {
          type: "add",
          category: "containers",
          path:
            "../../app/containers/{{properCase name}}/__fixtures__/allProps.fixture.js",
          templateFile: "./fixture/allProps.js.hbs",
          abortOnFail: true,
        },
        {
          type: "add",
          category: "containers",
          path:
            "../../app/containers/{{properCase name}}/__fixtures__/requiredProps.fixture.js",
          templateFile: "./fixture/requiredProps.js.hbs",
          abortOnFail: true,
        }
      );
    }

    // If they want actions and a reducer, generate actions.js,
    // reducer.js and the corresponding tests for actions and the reducer
    if (data.wantActionsAndReducer) {
      // Actions
      actions.push({
        type: "add",
        path: "../../app/containers/{{properCase name}}/actions.js",
        templateFile: "./container/actions.js.hbs",
        abortOnFail: true,
      });
      actions.push({
        type: "add",
        path: "../../app/containers/{{properCase name}}/__tests__/actions.test.js",
        templateFile: "./container/actions.test.js.hbs",
        abortOnFail: true,
      });

      // Selectors
      actions.push({
        type: "add",
        path: "../../app/containers/{{properCase name}}/selectors.js",
        templateFile: "./container/selectors.js.hbs",
        abortOnFail: true,
      });
      actions.push({
        type: "add",
        path: "../../app/containers/{{properCase name}}/__tests__/selectors.test.js",
        templateFile: "./container/selectors.test.js.hbs",
        abortOnFail: true,
      });

      // Reducer
      actions.push({
        type: "add",
        path: "../../app/containers/{{properCase name}}/reducer.js",
        templateFile: "./container/reducer.js.hbs",
        abortOnFail: true,
      });
      actions.push({
        type: "add",
        path: "../../app/containers/{{properCase name}}/__tests__/reducer.test.js",
        templateFile: "./container/reducer.test.js.hbs",
        abortOnFail: true,
      });
    }

    // Logic
    if (data.wantLogic) {
      actions.push({
        type: "add",
        path: "../../app/containers/{{properCase name}}/logic.js",
        templateFile: "./container/logic.js.hbs",
        abortOnFail: true,
      });
      actions.push({
        type: "add",
        path: "../../app/containers/{{properCase name}}/__tests__/logic.test.js",
        templateFile: "./container/logic.test.js.hbs",
        abortOnFail: true,
      });
    }

    // If want logic or reducer add Loadable.js
    if (data.wantActionsAndReducer || data.wantLogic) {
      actions.push({
        type: "add",
        path: "../../app/containers/{{properCase name}}/Loadable.js",
        templateFile: "./container/loadable.js.hbs",
        abortOnFail: true,
      });
    } else if (data.wantLoadable) {
      // want async component only
      actions.push({
        type: "add",
        path: "../../app/containers/{{properCase name}}/Loadable.js",
        templateFile: "./component/loadable.js.hbs",
        abortOnFail: true,
      });
    }

    return actions;
  },
};
