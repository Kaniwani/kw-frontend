import styled from 'styled-components';
import { fluidType } from 'shared/styles/utils';
import { link, linkHover } from 'shared/styles/colors';

/* eslint-disable id-length */
const P = styled.p`
  max-width: 35em; /* constrain line-length to ~70 chars */
  margin: 0 ${({ align }) => align === 'center' ? 'auto' : 0};

  text-align: ${({ align }) => align};

  &:not(:only-child) {
    ${fluidType(14, 20)}
    margin-top: 0;
    margin-bottom: .7em;
  }

  & + &:last-child {
    margin-bottom: 0;
  }

  & > a {
    color: rgb(${link});
    &:hover {
      color: rgb(${linkHover});
    }
  }
`;
/* eslint-enable */

P.defaultProps = {
  align: 'left',
};

export default P;
