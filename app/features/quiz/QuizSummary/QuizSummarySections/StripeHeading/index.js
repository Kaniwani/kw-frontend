import React from 'react';
import PropTypes from 'prop-types';
import { isNumber } from 'lodash';

import { white } from 'common/styles/colors';
import { Heading, Text, Count } from './styles';

StripeHeading.propTypes = {
  text: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  count: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

StripeHeading.defaultProps = {
  count: false,
  // must match parent background color otherwise strike line appears behind text
  bgColor: white[2],
};

function StripeHeading({ text, count, bgColor }) {
  return (
    <Heading>
      <Text bgColor={bgColor}>
        {isNumber(count) && <Count>{count}</Count>}
        {text}
      </Text>
    </Heading>
  );
}

export default StripeHeading;
