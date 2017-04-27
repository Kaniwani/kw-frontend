/**
 * componentExists
 *
 * Check whether the given component exist in the base, layouts, components or containers dirs
 */

const fs = require('fs');
const path = require('path');
const pageBase = fs.readdirSync(path.join(__dirname, '../../../app/base'));
const pageLayouts = fs.readdirSync(path.join(__dirname, '../../../app/layouts'));
const pageComponents = fs.readdirSync(path.join(__dirname, '../../../app/components'));
const pageContainers = fs.readdirSync(path.join(__dirname, '../../../app/containers'));
const components = pageBase.concat(...pageLayouts, ...pageComponents, ...pageContainers);

function componentExists(comp) {
  return components.indexOf(comp) >= 0;
}

module.exports = componentExists;
