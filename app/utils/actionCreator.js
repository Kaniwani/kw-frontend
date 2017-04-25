/**
 * Creates redux actions
 * @param  {string} type - action type constant
 * @param  {object} params - payload params
 * @return {object} actions
 * @example
 * const actions = {
 *  createCar: actionCreator(types.CREATE_CAR),
 *  editCar: actionCreator(types.EDIT_CAR, 'car')
 * };
 * // => actions = {
 *   createCar: () => {
 *     type: types.CREATE_CAR,
 *   },
 *   editCar: (car) => {
 *     type: types.EDIT_CAR,
 *     payload: {
 *       car,
 *     },
 *   },
 * }
 */
export default function actionCreator(type, ...params) {
  return (...args) => params.reduce((action, param, index) => {
    action.payload[param] = args[index]; // eslint-disable-line no-param-reassign
    return action;
  }, { type, payload: {} });
}
