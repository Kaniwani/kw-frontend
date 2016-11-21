import React from 'react';
import styled from 'styled-components';
import BackgroundImg from './BackgroundImg';

// FIXME: responsive, art directed png only images instead since the svg is huge

const Wrapper = styled.div`
  display: table-row;
  width: 100%;
  height: 100%;
  background-color: #e5e5e5;
`;


function ReviewFooter() {
  return (
    <Wrapper>
      <BackgroundImg />
    </Wrapper>
  );
}

export default ReviewFooter;
