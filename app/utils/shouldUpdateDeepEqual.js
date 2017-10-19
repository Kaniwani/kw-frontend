import { isEqual } from 'lodash';
import { shouldUpdate } from 'recompose';

/**
 * HoC which applies shouldUpdate comparing deep equal for provided prop names, if none given tests every prop
 * @param  {Array} propNames props to test if deep equal
 * @return {Function} HoC expecting a component
 */
const shouldUpdateDeepEqual = (propNames) =>
  shouldUpdate((props, nextProps) =>
    Array.isArray(propNames) ?
      propNames.some((propName) => !isEqual(props[propName], nextProps[propName])) :
      !isEqual(props, nextProps));

export default shouldUpdateDeepEqual;
