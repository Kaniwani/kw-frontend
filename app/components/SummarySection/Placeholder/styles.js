import H2 from 'base/H2';

export const Heading = H2.extend`
  font-weight: normal;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  span:first-child {
    margin-right: .5em;
  }
`;
