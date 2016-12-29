import styled from 'styled-components';
import { blueLight, purple } from 'shared/styles/colors';
import { epsilon } from 'shared/styles/typography';
import A from 'components/A';


export const Nav = styled.nav`
  display: flex;
  justify-content: center;
`;

export const Li = styled.li`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  ${epsilon}
`;

export const NavLink = styled(A)`
  display: flex;
  padding: 0 .8em;
  justify-content: center;
  align-items: center;

  &:hover,
  &:active,
  &.is-active {
    > .NavLink__Text:after {
      opacity: 1;
      width: 100%;
    }
  }

  &:focus {
    > .NavLink__Text:after {
      opacity: 1;
      width: 100%;
    }
  }
`;

export const Text = styled.span`
  position: relative;
  padding-bottom: 4px;

  &:not(:only-child) {
    padding-right: .4em;
  }

  /* underline */
  &:after {
    display: block;
    position: absolute;
    content: "";
    width: 0;
    bottom: 0;
    left: 50%;
    opacity: 0;
    height: 3px;
    background: rgb(${purple});
    transition: all .3s ease-out;
    transform: translateX(-50%);
  }
`;

export const Count = styled.span`
  color: rgb(${blueLight});
  margin-left: .3em;
`;
