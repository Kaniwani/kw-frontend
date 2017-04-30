import React from 'react';
import ToggleSwitch from 'components/ToggleSwitch';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <h1>
        Hello HomePage
        <label htmlFor="derp">
          toggle me
          <ToggleSwitch id="derp" name="derp" isChecked={false} />
        </label>
      </h1>
    );
  }
}
