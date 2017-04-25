/* eslint-disable no-param-reassign */

/**
 * Marks sagas as daemons so they will only run once in react-router onEntry handler
 * @param  {Array} list of saga functions
 * @return {Array} new list with sagas marked as daemons
 */
function markAllAsDaemon(sagas = []) {
  return sagas.slice().map((saga) => {
    saga.isDaemon = true;
    return saga;
  });
}

export default markAllAsDaemon;
