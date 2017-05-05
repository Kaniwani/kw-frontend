import React from 'react';
import cuid from 'cuid';

import blockEvent from 'utils/blockEvent';
import Input from './Input';
import {
  Wrapper,
  Form,
  SelectList,
  SelectListItem,
  Label,
  SelectedPointer,
  SubmitButton,
} from './styles';

export const PANELS = [
  'Register',
  'Sign In',
  'Reset',
];

class MultiLogin extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    selected: PANELS[1],
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selected !== prevState.selected) {
      this.mainInput.focus();
    }
  }

  handleSelectChange = (PANEL) => (event) => {
    blockEvent(event);
    this.setState({
      selected: PANEL,
    });
  }

  handleSubmit = (event) => {
    blockEvent(event);
    // dispatch some action with this.state.selected
  }

  render() {
    const registerSelected = this.state.selected === PANELS[0];
    const loginSelected = this.state.selected === PANELS[1];
    const resetSelected = this.state.selected === PANELS[2];

    return (
      <Wrapper
        loginSelected={loginSelected}
        registerSelected={registerSelected}
        resetSelected={resetSelected}
      >
        <Form onSubmit={this.handleSubmit}>
          <SelectList plainList>
            {PANELS.map((PANEL) => (
              <SelectListItem
                key={cuid()}
                isActive={this.state.selected === PANEL}
                onClick={this.handleSelectChange(PANEL)}
              >
                {PANEL}
              </SelectListItem>
            ))}
          </SelectList>
          <SelectedPointer
            loginSelected={loginSelected}
            registerSelected={registerSelected}
            resetSelected={resetSelected}
          />
          {/* TODO: CUSTOM username || email validator */}
          <Label for="user">Enter account {loginSelected ? 'email or username' : 'Email'}</Label>
          <Input
            ref={(node) => { this.mainInput = node; }}
            name="user"
            placeholder={loginSelected ? 'Email or Username' : 'Email'}
            isVisible
            autoFocus
          />
          <Label for="password">Enter account password</Label>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            isVisible={registerSelected || loginSelected}
          />
          <Label for="confirmPassword">Confirm account password</Label>
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            isVisible={registerSelected}
          />
          <Label for="apiKey">Enter WaniKani API key</Label>
          <Input
            name="apiKey"
            placeholder="WaniKani API key"
            isVisible={registerSelected}
          />
          <SubmitButton type="submit">
            {registerSelected && 'Create Account'}
            {loginSelected && 'Sign In'}
            {resetSelected && 'Reset Password'}
          </SubmitButton>
        </Form>
      </Wrapper>
    );
  }
}

export default MultiLogin;
