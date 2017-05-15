import styled from 'styled-components';
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
`;

export const SubmitButton = styled(IconButton)`
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -${componentHeight / 2}px;
  margin-top:  -${componentHeight / 2}px;
  border-radius: ${componentHeight}px;
  transition: all 0.4s ease-in-out;
  padding: ${(componentHeight - iconHeight) / 2}px;
  background-color: ${blueLight};

  /* override IconButton scaling and opacity */
  &:active:not(:disabled) {
    transform: scale(1);
    opacity: 1;
  }

  ${({ isExpanded }) => isExpanded && `
    border-radius: 0 ${componentHeight}px ${componentHeight}px 0;
    margin-left: 115px;
    /* shift icon to the left a little */
    padding-left: ${((componentHeight - iconHeight) - 2) / 2}px;
    padding-right: ${((componentHeight - iconHeight) + 2) / 2}px;
  `}

  ${({ isSubmitting }) => isSubmitting && `
    svg {
      animation: ${spin} 1s linear infinite;
    }
  `}

  ${({ isExpanded, isSubmitting }) => isExpanded && isSubmitting && `

  `}
`;

export const SearchInput = styled.input`
  ${resetInput}
  position: absolute;
  width: 0px;
  height: ${componentHeight}px;
  line-height: ${componentHeight}px;
  top: 50%;
  left: 50%;
  margin-left: ${componentHeight / 2}px;
  margin-top: -${componentHeight / 2}px;
  border-radius: ${componentHeight}px;
  padding: 0;
  border: none;
  opacity: 0;
  font-size: 1.5em;
  transition: all 0.4s ease-in-out;

  &:focus{
    outline-width: 0px;
  }

  ${({ isExpanded }) => isExpanded && `
    border: 1px solid ${transparentize(0.1, blueLight)};
    border-right-width: 0px;
    margin-left: -185px;
    width: 300px;
    padding: 5px 20px;
    opacity: 1;
    border-radius: ${componentHeight}px 0 0 ${componentHeight}px;
  `}
`;
