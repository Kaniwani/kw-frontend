import { createLogic } from "redux-logic";
import { contact } from "./actions";
import { IS_DEV_ENV } from "common/constants";

export const sendLogic = createLogic({
  type: contact.send.request,
  warnTimeout: 10000,
  throttle: 2000,
  // TODO: contact ui reducer for notifications?
  processOptions: {
    successType: contact.send.success,
    failType: contact.send.failure,
  },
  transform({ action }, next) {
    const updatedPayload = { ...action.payload };
    if (IS_DEV_ENV) {
      updatedPayload.body =
        "TEST: From Frontend development env.\n" +
        `${updatedPayload.body}`;
    }
    next({ ...action, payload: updatedPayload });
  },
  process({ api, action }) {
    return api.contact.send(action.payload);
  },
});

export default [sendLogic];
