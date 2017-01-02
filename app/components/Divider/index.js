import * as COLORS from 'shared/styles/colors';
import styled from 'styled-components';

const dividerStyle = (props) => {
  const dividerColor = COLORS[props.color] || COLORS.grey;
  if (props.fade) {
    return `
      border-image: linear-gradient(
        90deg,
        rgba(${dividerColor}, 0),
        rgba(${dividerColor}, 1) 50%,
        rgba(${dividerColor}, 0) 100%) 0 0 100%;
    `;
  }
  return `border-color: rgb(${dividerColor})`;
};

const Divider = styled.div`
  border: 0;
  margin: .5rem auto;
  max-width: ${(props) => props.fullWidth ? '100%' : '70%'};
  background-position: 50%;
  color: rgb(${(props) => COLORS[props.color] || COLORS.grey});
  background-color: transparent;
  border-width: 0 0 1px;
  border-style: solid;
  ${(props) => dividerStyle(props)}
`;

export default Divider;