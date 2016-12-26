import * as COLORS from 'shared/styles/colors';
import styled from 'styled-components';

const dividerColor = (props) => COLORS[props.color] || COLORS.grey;
const dividerStyle = (props) => {
  if (props.fade) {
    return `
      border-image: linear-gradient(
        90deg,
        rgba(${dividerColor(props)}, 0),
        rgba(${dividerColor(props)}, 1) 50%,
        rgba(${dividerColor(props)}, 0) 100%) 0 0 100%;
    `;
  }
  return `border-color: rgb(${dividerColor})`;
};

const Divider = styled.div`
  border: 0;
  margin: .5rem auto;
  max-width: ${(props) => props.fullWidth ? '100%' : '70%'};
  background-position: 50%;
  color: rgb(${dividerColor});
  background-color: transparent;
  border-width: 0 0 1px;
  border-style: solid;
  ${dividerStyle}
`;

export default Divider;
