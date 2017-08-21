import { createTransform } from 'redux-persist';
import { stringify, parse } from 'json-literal';

// ensures Dates and other non-json objects are rehydrated to proper JS instances
const jsonTransform = createTransform(
  // transform state coming from redux on its way to being serialized and stored
  (inboundState/* , key */) => stringify(inboundState),
  // transform state coming from storage, on its way to be rehydrated into redux
  (outboundState/* , key */) => parse(outboundState),
  { whitelist: ['global'] }
);

export default jsonTransform;
