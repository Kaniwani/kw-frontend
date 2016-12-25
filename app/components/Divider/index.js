import * as COLORS from 'shared/styles/colors';
import styled from 'styled-components';

const dividerColor = (props) => COLORS[props.color] || COLORS.grey;

const Divider = styled.hr`
  border: 0;
  margin: .5rem auto;
  max-width: 70%;
  background-position: 50%;
  color: rgb(${dividerColor});
  background-color: transparent;
  border-width: 0 0 1px;
  border-image: linear-gradient(
    90deg,
    rgba(${dividerColor}, 0),
    rgba(${dividerColor}, .8) 50%,
    rgba(${dividerColor}, 0) 100%) 0 0 100%;
  border-style: solid;
`;

export default Divider;
