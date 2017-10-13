import React from 'react';
import PropTypes from 'prop-types';

import H2 from 'base/H2';
import A from 'base/A';
import { orange } from 'shared/styles/colors';

const Text = H2.extend`
  color: ${orange};
  text-align: center;
`;

ApiKeyCheck.propTypes = {
  valid: PropTypes.bool,
};

ApiKeyCheck.defaulProps = {
  valid: true,
};

function ApiKeyCheck({ valid }) {
  return valid === false && <Text>Api Key Invalid! Navigate to <A to="/settings">settings</A> to check and update!</Text>;
}

export default ApiKeyCheck;
