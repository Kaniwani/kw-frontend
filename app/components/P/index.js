import styled from 'styled-components';
import { epsilon, bodyRhythm } from 'shared/styles/typography';
import { link, linkHover } from 'shared/styles/colors';

/* eslint-disable id-length */
const P = styled.p`
  max-width: 35em; /* constrain line-length to ~70 chars */
  margin-left: ${({ align }) => align === 'center' ? 'auto' : 0};
  margin-right: ${({ align }) => align === 'center' ? 'auto' : 0};
  ${epsilon}
  ${bodyRhythm}

  & > a {
    color: ${link};
    &:hover {
      color: ${linkHover};
    }
  }
`;
/* eslint-enable */

P.defaultProps = {
  align: 'left',
};

export default P;
