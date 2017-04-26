/**
 * Marks sagas as daemons so they will only run once in react-router onEntry handler
 * @param  {Array} sagas list of saga functions
 * @return {Array} new list with sagas marked as daemons
 */
function markAllAsDaemon(sagas = []) {
  return sagas.slice().map((saga) => {
    saga.isDaemon = true; // eslint-disable-line no-param-reassign
    return saga;
  });
}

export default markAllAsDaemon;
