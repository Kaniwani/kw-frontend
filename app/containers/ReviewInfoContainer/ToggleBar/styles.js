import styled from 'styled-components';
import { media } from 'shared/styles/media';
import { siteMaxWidth } from 'shared/styles/sizing';
import { resetButton } from 'shared/styles/utils';
import { transparent, whiteLight, greyLight, greyDark } from 'shared/styles/colors';
import { micro } from 'shared/styles/typography';
import { shadowBox } from 'shared/styles/shadows';

export const Wrapper = styled.div`
  display: flex;
  z-index: 2;
  margin: 0;
  list-style: none;
  justify-content: center;
  background-color: ${transparent};
  padding: 0 .4rem .4rem;
  width: 100%;
  ${media().sm`
    padding-left: .2rem; /* toggles have .2rem side margins */
    padding-right: .2rem;
    max-width: ${siteMaxWidth}px;
    margin-left: auto;
    margin-right: auto;
  `}
`;

export const ToggleButton = styled.button`
  ${resetButton}
  ${micro}
  ${shadowBox}
  position: relative;
  text-align: center;
  text-transform: uppercase;
  flex: 0 1 300px;
  ${''/* cursor: pointer; */}
  padding: .2rem;
  margin: 0 .2rem;
  background-color: ${whiteLight};
  color: ${greyLight};

  ${({ isActive }) => isActive && `
    color: ${greyDark};

    /* Triangle pointer */
    &:after {
      content: '';
      position: absolute;
      bottom: -.6rem;
      left: 50%;
      margin-left: -.9rem;
      border-style: solid;
      border-width: 0 .8rem .8rem .8rem;
      border-color: ${transparent} ${transparent} ${whiteLight} ${transparent};
      z-index: 10;
    }
  `}

  &:hover {
    color: ${greyDark};
  }

  &:disabled {
    opacity: .7;
    cursor: not-allowed;
    pointer-events: none;
  }
`;
