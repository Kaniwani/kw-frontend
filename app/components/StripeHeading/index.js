import React from 'react';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';

import { Heading, Text, Count } from './styles';

StripeHeading.propTypes = {
  text: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
};

StripeHeading.defaultProps = {
  count: false,
};

function StripeHeading({ count, text }) {
  return (
    <Heading>
      <Text>
        {isNumber(count) && <Count>{count}</Count>}
        {text}
      </Text>
    </Heading>
  );
}

export default StripeHeading;
