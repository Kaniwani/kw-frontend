import styled, { css } from 'styled-components';
import H1 from 'common/components/H1';
import H2 from 'common/components/H2';
import P from 'common/components/P';
import BGImg from 'common/components/BackgroundImg';

import { pink, grey } from 'common/styles/colors';
import { godzilla } from 'common/styles/typography';
import { breakpoints } from 'common/styles/media';

export const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
`;

export const BackgroundImg = styled(BGImg)`
  max-width: 700px;
  background-position: left bottom;
  background-size: contain;

  @media (min-width: ${breakpoints.lg}px ) {
    max-width: 50vw;
  }

`;

export const Title = styled(H1)`
  ${godzilla}
  color: ${pink[5]};
  display: flex;
  flex-flow: row wrap;
  @media (min-width: ${breakpoints.md}px) {
    margin-left: auto;
    text-align: right;
  }
`;

const textStyle = css`
  color: ${grey[8]};
  @media (min-width: ${breakpoints.md}px ) {
    max-width: 800px;
    margin-left: auto;
    text-align: right;
  }
`;

export const Subtitle = styled(H2)`
 ${textStyle}
`;

export const Text = styled(P)`
  ${textStyle}
  font-weight: 600;
  font-style: italic;
`;
