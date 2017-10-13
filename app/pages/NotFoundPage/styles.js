import styled from 'styled-components';
import H1 from 'base/H1';
import H2 from 'base/H2';
import BGImg from 'components/BackgroundImg';

import { pink, greyDark } from 'shared/styles/colors';
import { kilo, godzilla } from 'shared/styles/typography';
import { media } from 'shared/styles/media';

export const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
`;

export const BackgroundImg = BGImg.extend`
  max-width: 75vmax;
  max-width: 700px;
  background-position: left bottom;
  background-size: contain;
  ${media().lg`
    background-position: 15% center;
    background-size: cover;
  `}
`;

export const Title = H1.extend`
  ${kilo}
  color: ${pink};
  ${media().md`
    ${godzilla}
    margin-left: auto;
    text-align: right;
  `}
`;

export const Text = H2.extend`
  color: ${greyDark};
  ${media().md`
    max-width: 800px;
    margin-left: auto;
    text-align: right;
  `}
`;
