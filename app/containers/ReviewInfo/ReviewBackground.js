import styled from 'styled-components';

import bg from 'shared/assets/img/backgrounds/reviews.svg';

const ReviewBackground = styled.div`
  flex: 1 0 100%;
  opacity: .9;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: cover;
  margin-top: auto;
  max-height: 25vmax;
`;

export default ReviewBackground;
