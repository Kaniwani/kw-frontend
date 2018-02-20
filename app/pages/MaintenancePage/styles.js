import styled, { css } from 'styled-components';
import H1 from 'common/components/H1';
import H2 from 'common/components/H2';
import BGImg from 'common/components/BackgroundImg';

import { white } from 'common/styles/colors';
import { media } from 'common/styles/media';
import { fluidType } from 'common/styles/utils';

export const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
`;

export const BackgroundImg = BGImg.extend`
  background-position: 33% top;
`;

export const Title = H1.extend`
  ${fluidType(30, 90, 400, 2000)}
  color: ${white[5]};
  text-align: center;
  line-height: 1;
  ${media().md`
    margin-left: auto;
    text-align: right;
  `}
  & > span {
    font-weight: 600;
    font-size: .85em;
  }
`;

const textStyle = css`
  ${fluidType(22, 45, 400, 2000)}
  color: ${white[5]};
  font-weight: 400;
  text-align: center;
  ${media().md`
    max-width: 800px;
    margin-left: auto;
    text-align: right;
  `}
`;

export const Subtitle = H2.extend`
  ${textStyle}
`;
