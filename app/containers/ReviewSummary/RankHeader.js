import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { white, grey } from 'shared/styles/colors';

const Header = styled.h3`
  margin: 0 0 1.25em;
  color: rgba(${grey}, .9);
  font-weight: 400;
  line-height: 1.2;
  border-bottom: 2px solid rgba(${grey}, .25);
`;

const Inner = styled.span`
  position: relative;
  display: inline-block;
  top: .5em;
  margin-left: .5em;
  padding: 0 .33em;
  background-color: white;
`;

const RankCount = styled.strong`
  margin-right: .3em;
  padding: .1em .4em;
  background-color: rgba(${grey}, .9);
  color: rgb(${white});
  border-radius: 2px;
`;

const RankHeader = ({ text, count }) => (
  <Header>
    <Inner>
      <RankCount>{count}</RankCount>
      {text}
    </Inner>
  </Header>
);

RankHeader.propTypes = {
  text: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default RankHeader;
