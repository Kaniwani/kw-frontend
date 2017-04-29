import React from 'react';
import WithTooltip from 'containers/WithTooltip';
import Icon from 'components/Icon';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const IconWithTooltip = WithTooltip(Icon);
    return (
      <h1>
        Hello HomePage
        <IconWithTooltip name="ADD" data-tip="uhhh" />
      </h1>
    );
  }
}
