import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import H2 from 'common/components/H2';
import A from 'common/components/A';
import { whiteLight, orange } from 'common/styles/colors';
import { gutter } from 'common/styles/layout';
import { borderRadius } from 'common/styles/sizing';

import { selectApiValid } from 'features/user/selectors';

// FIXME: refactor out a PortalBanner component, so other comps can make announcements?

const Text = H2.extend`
  ${gutter({ mod: 2 })}
  margin-bottom: 1rem;
  background-color: ${orange};
  border-radius: ${borderRadius};
  color: ${whiteLight};
  text-align: center;
`;

ApiKeyCheck.propTypes = {
  valid: PropTypes.bool,
};

ApiKeyCheck.defaulProps = {
  valid: true,
};

export function ApiKeyCheck({ valid }) {
  return valid === false && (
    <Text>
      <div>Your Api Key appears to be invalid!</div>
      <div>Please visit the <A to="/settings">settings</A> page to check and update.</div>
    </Text>
  );
}

const mapStateToProps = (state) => ({ valid: selectApiValid(state) });
export default connect(mapStateToProps)(ApiKeyCheck);
