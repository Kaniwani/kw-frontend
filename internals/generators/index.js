/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const fs = require("fs");
const path = require("path");
const baseGenerator = require("./base/index.js");
const componentGenerator = require("./component/index.js");
const containerGenerator = require("./container/index.js");
const fixtureGenerator = require("./fixture/index.js");

module.exports = (plop) => {
  plop.setGenerator("base", baseGenerator);
  plop.setGenerator("component", componentGenerator);
  plop.setGenerator("container", containerGenerator);
  plop.setGenerator("fixture", fixtureGenerator);
  plop.addHelper("directory", (comp) => {
    try {
      fs.accessSync(path.join(__dirname, `../../app/containers/${comp}`), fs.F_OK);
      return `containers/${comp}`;
    } catch (e) {
      return `components/${comp}`;
    }
  });
  plop.addHelper("curly", (object, open) => (open ? "{" : "}"));
};
