import { handleActions } from "redux-actions";
import orm from 'common/orm';

export const initialState = orm.getEmptyState();

export default handleActions({
  // todooooo
}, initialState);
