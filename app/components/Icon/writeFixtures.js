import fs from 'fs';
import { ICONS } from './constants';

Object.keys(ICONS).forEach((name) => {
  const fileName = `__fixtures__/${name.toLowerCase()}.js`;
  const content = `
    export default {
      props: {
        name: '${name}',
        size: '5rem',
      },
    };`;
  fs.writeFile(fileName, content, (err) => err ? console.error(err) : console.log(`${fileName} generated`));
});
