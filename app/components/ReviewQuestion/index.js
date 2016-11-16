import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { white, purpleDark } from 'shared/styles/colors';
import { media } from 'shared/styles/media';
import Wrapper from './Wrapper';

const Meaning = styled.h1`
  color: ${white};
  text-shadow: 1px 2px 4px ${purpleDark};
  padding: 50px 15px 30px;
  display: table-cell;
  font-size: calc(20px + 30 * ((100vw - 300px) / 1700));
  vertical-align: middle;
  line-height: 1.3;
  letter-spacing: -1px;
  margin-top: .5em;
  ${media('min').lg`
    padding-left: 10%;
    padding-right: 10%;
  `}
`;

const Question = ({ meaning }) => (
  <Wrapper>
    <Meaning>{ meaning }</Meaning>
  </Wrapper>
);

Question.propTypes = {
  meaning: PropTypes.string.isRequired,
};

export default Question;
