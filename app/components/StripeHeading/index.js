import React from 'react';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';

import { Wrapper, Heading, Text, Count } from './styles';

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
    <Wrapper>
      <Heading>
        <Text>
          {isNumber(count) && <Count>{count}</Count>}
          {text}
        </Text>
      </Heading>
    </Wrapper>
  );
}

export default StripeHeading;
