import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

import { blueLight } from 'shared/styles/colors';
import { spin } from 'shared/styles/animation';

import IconButton from 'components/IconButton';
import { resetInput } from 'shared/styles/utils';

const componentHeight = 62;
const iconHeight = 32; // should match <SubmitButton size="32px" /> in `../index`

// FIXME: needs positioning fixes
// perhaps only expand input, button never moves (can get rid of absolute positioning, just use flex or width)

export const Wrapper = styled.div`
  position: relative;
  height: ${componentHeight}px;
  display: flex;
`;

export const SubmitButton = styled(IconButton)`
  border-radius: ${componentHeight}px;
  transition: all 0.4s ease-in-out;
  padding: ${(componentHeight - iconHeight) / 2}px;
  background-color: ${blueLight};

  /* override IconButton scaling and opacity */
  &:active:not(:disabled) {
    transform: scale(1);
    opacity: 1;
  }

  ${({ isExpanded }) => isExpanded && css`
    border-radius: 0 ${componentHeight}px ${componentHeight}px 0;
    /* shift icon to the left a little */
    padding-left: ${((componentHeight - iconHeight) - 2) / 2}px;
    padding-right: ${((componentHeight - iconHeight) + 2) / 2}px;
  `}

  ${({ isSubmitting }) => isSubmitting && css`
    svg {
      animation: ${spin} 1s linear infinite;
    }
  `}
`;

export const SearchInput = styled.input`
  ${resetInput}
  width: 0;
  height: ${componentHeight}px;
  line-height: ${componentHeight}px;
  border-radius: ${componentHeight}px;
  padding: 0;
  border: 1px solid ${transparentize(0.1, blueLight)};
  border-width: 0;
  font-size: 1.5em;
  transition: all 0.4s ease-in-out;

  &:focus{
    outline-width: 0;
  }

  ${({ isExpanded }) => isExpanded && css`
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-left-width: 1px;
    width: 300px;
    padding: 5px 20px;
    border-radius: ${componentHeight}px 0 0 ${componentHeight}px;
  `}
`;
