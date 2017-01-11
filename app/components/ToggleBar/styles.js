import styled from 'styled-components';
import { whiteLight, greyLight, grey, greyDark } from 'shared/styles/colors';
import { siteMaxWidth } from 'shared/styles/sizing';
import { micro } from 'shared/styles/typography';
import { resetButton } from 'shared/styles/utils';
import { media } from 'shared/styles/media';
import { shadowBox } from 'shared/styles/shadows';


export const Wrapper = styled.section`
  display: flex;
  margin: 0;
  list-style: none;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0);
  padding: 0 .4rem .4rem;
  width: 100%;
  z-index: 2;
  ${media('min').sm`
    padding-left: .2rem; /* toggles have .2rem side margins */
    padding-right: .2rem;
    max-width: ${siteMaxWidth}px;
    margin-left: auto;
    margin-right: auto;
  `}
`;

export const Toggle = styled.button`
  & {
    ${resetButton}
    text-align: center;
    position: relative;
    ${micro}
    flex: 0 1 300px;
    cursor: pointer;
    padding: .2rem;
    margin: 0 .2rem;
    ${shadowBox}
    background-color: ${whiteLight};
    color: ${greyLight};
    &.is-active {
      color: ${greyDark};
      /* Triangle pointer */
      &:after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        bottom: -.6rem;
        left: 50%;
        margin-left: -.9rem;
        border-style: solid;
        border-width: 0 .8rem .8rem .8rem;
        border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) ${whiteLight} rgba(0, 0, 0, 0);
        z-index: 10;
      }
    }
    &.is-disabled {
      opacity: .7;
      cursor: not-allowed;
      pointer-events: none;
    }
  }
`;

export const DetailToggle = styled(Toggle)`
  color: ${grey};
`;
