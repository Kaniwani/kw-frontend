import * as COLORS from 'shared/styles/colors';
import { adjustColor } from 'shared/styles/utils';
import styled from 'styled-components';

const dividerStyle = (props) => {
  const dividerColor = COLORS[props.color] || COLORS.grey;
  if (props.fade) {
    return `
      border-image: linear-gradient(
        90deg,
        ${adjustColor(dividerColor, 'alpha(0)')},
        ${adjustColor(dividerColor, 'alpha(1)')} 50%,
        ${adjustColor(dividerColor, 'alpha(0)')} 100%) 0 0 100%;
    `;
  }
  return `border-color: ${dividerColor}`;
};

const Divider = styled.div`
  border: 0;
  margin: .5rem auto;
  max-width: ${(props) => props.fullWidth ? '100%' : '70%'};
  background-position: 50%;
  color: ${(props) => COLORS[props.color] || COLORS.grey};
  background-color: transparent;
  border-width: 0 0 1px;
  border-style: solid;
  ${(props) => dividerStyle(props)}
`;

export default Divider;
