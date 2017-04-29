import React from 'react';
import ReactTooltip from 'react-tooltip';

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: React.PropTypes.node.isRequired,
  }

  render() {
    return (
      <div>
        <ReactTooltip id="globalTooltip" />
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}
