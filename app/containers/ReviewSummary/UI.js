import styled from 'styled-components';
import Icon from 'components/Icon';
import Container from 'components/Container';
import H1 from 'components/H1';
import * as COLORS from 'shared/styles/colors';
import { lightness } from 'shared/styles/utils';

export const StyledContainer = styled(Container)`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled(H1)`
  &:not(:first-child) { margin-top: 0; } /* hmm... this is irritating */
  align-self: flex-start;
`;

export const SummaryNav = styled.nav`
  display: flex;
  flex: 1 0 2em;
`;

export const AlignToIcon = styled.span`
  vertical-align: middle;
  line-height: 1;
`;

export const LinkBlock = styled.div`
  display: inline-flex;

  > * {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    padding: 0 1em;
    background-color: black;
    color: #fff;
    letter-spacing: -1px;
    text-shadow: 1px 1px 0 rgba(0,0,0,0.1);
  }

  & > *:first-child {
    transition: background-color 0.2s ease-in;
    border-radius: 3px 0 0 3px;
    background-color: rgb(${COLORS.blue});
    &:hover {
      background-color: rgb(${COLORS.blueLight});
    }
  }

  & > *:last-child {
    border-radius: 0 3px 3px 0;
  }
`;

export const InboxIcon = styled(Icon)`
  margin-right: .4em;
`;

export const SectionHeader = styled.h2`
  margin: 0;
  padding: 1rem;
  color: white;
  background-color: rgba(${({ color }) => COLORS[color]}, .95);
  text-shadow: 0.05em 0.05em 0.1em ${({ color }) => lightness(COLORS[color], 20, '-')};
`;
