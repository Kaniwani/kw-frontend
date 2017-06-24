/**
 * componentExists
 *
 * Check whether the given component exist in the base, components or containers dirs
 */

const fs = require('fs');
const path = require('path');
const pageBase = fs.readdirSync(path.join(__dirname, '../../../app/base'));
const pageComponents = fs.readdirSync(path.join(__dirname, '../../../app/components'));
const pageContainers = fs.readdirSync(path.join(__dirname, '../../../app/containers'));
const components = [...pageBase, ...pageComponents, ...pageContainers];

function componentExists(comp) {
  return components.indexOf(comp) >= 0;
}

module.exports = componentExists;
