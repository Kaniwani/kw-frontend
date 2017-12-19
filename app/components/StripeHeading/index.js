import React from "react";
import PropTypes from "prop-types";
import { isNumber } from "lodash";
import { chromeDefaultBg } from "shared/styles/colors";
import { Heading, Text, Count } from "./styles";

StripeHeading.propTypes = {
  text: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  count: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

StripeHeading.defaultProps = {
  count: false,
  // must match parent background color otherwise strike line appears behind text
  bgColor: chromeDefaultBg,
};

function StripeHeading({
  text, count, bgColor,
}) {
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
