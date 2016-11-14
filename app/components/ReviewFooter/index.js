import React from 'react';
import styled from 'styled-components';

// TODO: responsive, art directed png only images instead since the svg is huge
import bg from 'shared/assets/img/backgrounds/reviews-800.png';
import bgMd from 'shared/assets/img/backgrounds/reviews-1200.png';
import bgXl from 'shared/assets/img/backgrounds/reviews.svg';

const Wrapper = styled.div`
  display: table-row;
  width: 100%;
  height: 100%;
  background-color: #e5e5e5;
`;

const BackgroundImg = styled.div`
  width: 100%;
  height: 100%;
  opacity: .9;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: auto;

  @media(min-width: 600px) {
    background-size: contain;
    background-image: url(${bgMd});
  }

  @media(min-width: 1200px) {
    background-size: cover;
    background-image: url(${bgXl});
  }
`;

function ReviewFooter() {
  return (
    <Wrapper>
      <BackgroundImg />
    </Wrapper>
  );
}

export default ReviewFooter;
