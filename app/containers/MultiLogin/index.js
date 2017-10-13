import React from 'react';
import { Redirect } from 'react-router-dom';

import { hasToken } from 'utils/auth';
import { Wrapper } from './styles';
import FormSelector from './FormSelector';
import Form from './Form';

class MultiLogin extends React.PureComponent {
  state = {
    activePanel: 'Login',
    panels: [
      'Register',
      'Login',
      'Reset',
    ],
  }

  setActivePanel = (activePanel) => {
    this.setState({ activePanel });
  }

  isPanelSelected = (panel) => this.state.activePanel === panel

  render() {
    const selections = {
      registerSelected: this.isPanelSelected('Register'),
      loginSelected: this.isPanelSelected('Login'),
      resetSelected: this.isPanelSelected('Reset'),
    };

    return hasToken() ? (
      <Redirect to="/" />
    ) : (
      <Wrapper>
        <FormSelector
          activePanel={this.state.activePanel}
          panels={this.state.panels}
          setActivePanel={this.setActivePanel}
          {...selections}
        />
        <Form {...selections} />
      </Wrapper>
    );
  }
}

export default MultiLogin;
