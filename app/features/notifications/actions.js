import { createActions } from 'redux-actions';
import cuid from 'cuid';
import { TYPES } from './constants';

export const { notify } = createActions({
  NOTIFY: {
    SUCCESS: (payload) => ({ ...payload, id: cuid(), type: TYPES.SUCCESS }),
    INFO: (payload) => ({ ...payload, id: cuid(), type: TYPES.INFO }),
    WARNING: (payload) => ({ ...payload, id: cuid(), type: TYPES.WARNING }),
    ERROR: (payload) => ({ ...payload, id: cuid(), type: TYPES.ERROR }),
    REMOVE: (id) => ({ id }),
  },
});

export default notify;
