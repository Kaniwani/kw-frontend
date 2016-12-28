import styled from 'styled-components';
import { epsilon, bodyRhythm } from 'shared/styles/typography';
import { link, linkHover } from 'shared/styles/colors';

/* eslint-disable id-length */
const P = styled.p`
  max-width: 35em; /* constrain line-length to ~70 chars */
  margin-left: ${({ align }) => align === 'center' ? 'auto' : 0};
  margin-right: ${({ align }) => align === 'center' ? 'auto' : 0};
  text-align: ${({ align }) => align};
  ${epsilon}
  ${bodyRhythm}

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
