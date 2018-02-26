import { IS_DEV_ENV } from 'common/constants';

export default (...msg) => {
  if (IS_DEV_ENV) {
    console.log(...msg); // eslint-disable-line
  }
};
