import styled from 'styled-components';
import { adjustColor, resetButton, tapTarget } from 'shared/styles/utils';
import { black, white, whiteDark, greyDark } from 'shared/styles/colors';
import List from 'components/List';
import { Nav, Li, NavLink, Text, Count } from 'components/DesktopNav/styles';

export {
  Nav,
  Li,
  Text,
  Count,
};

// prefer no hover states on touch devices
export const MobileNavLink = styled(NavLink)`
  &:hover:not(.is-active) > .NavLink__Text:after {
    opacity: 0;
    width: 0;
  }
`;

export const OffCanvasMenu = styled(List)`
  position: absolute;
  width: 180px;
  background: ${white};
  height: auto;
  top: ${(props) => props.offsetTop}px;
  right: -180px;
  z-index: 10;
  transition: right 400ms cubic-bezier(0.55, 0, 0.1, 1);
  border-top: 1px solid ${adjustColor(whiteDark, 'alpha(0.5)')};
  border-bottom-left-radius: 10px;

  display: flex;
  flex-direction: column;

  &.is-visible {
    right: -1px; /* -1px avoids potential subpixel gap >_< */
    box-shadow: -1px 1px 3px ${adjustColor(black, 'alpha(0.2)')};
  }

  /* override central! :cocktail: */
  & > li {
    flex: 1 0 auto;
    border-bottom: 1px solid ${adjustColor(whiteDark, 'alpha(0.75)')};

    > a {
      padding: .7rem 1rem .6rem;

      > span {
         bottom: 0; /* different centering to base navlink when in vertical list */
       }
    }
  }

`;

export const Toggle = styled.button`
  & {
    ${resetButton}
    ${tapTarget()}
    position: relative;
    z-index: 1;
    width: 3em;
    height: 1.5em;
    cursor: pointer;
    align-self: center;
    padding-bottom: 4px; /* other items in nav have bottom padding for hover underlines */
    transition: transform 400ms cubic-bezier(0.55, 0, 0.1, 1);
    transform: rotate(-180deg);

    /* Kebab icon when off-screen nav is open */
    &.is-active {
      transform: rotate(-90deg);
    }
  }
`;

export const ToggleDot = styled.span`
  position: absolute;
  right: 0;
  left: 0;
  display: block;
  width: 4px;
  height: 4px;
  margin: auto;
  pointer-events: none;
  border-radius: 50%;
  background-color: ${greyDark};

  &:nth-of-type(1) {
    top: 0;
  }

  &:nth-of-type(2) {
    top: 50%;
    transform: translateY(-50%);
  }

  &:nth-of-type(3) {
    bottom: 0;
  }
`;
