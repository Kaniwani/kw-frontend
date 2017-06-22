import React from 'react';
import cuid from 'cuid';

import blockEvent from 'utils/blockEvent';
import Input from './Input';
import {
  Form,
  SelectList,
  SelectListItem,
  Label,
  SelectedPointer,
  SubmitButton,
  ApiInput,
  ApiLink,
} from './styles';

export const PANELS = [
  'Register',
  'Login',
  'Reset',
];

class MultiLogin extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    selected: PANELS[1],
  }

  handleSelectChange = PANEL => (event) => {
    blockEvent(event);
    // TODO: clear fields
    this.setState({ selected: PANEL });
    this.mainInput.blur();
  }

  handleSubmit = (event) => {
    blockEvent(event);
    // dispatch relevant action based on this.state.selected
  }

  render() {
    const registerSelected = this.state.selected === PANELS[0];
    const loginSelected = this.state.selected === PANELS[1];
    const resetSelected = this.state.selected === PANELS[2];
    const notRegisterSelected = loginSelected || resetSelected;

    const mainInputText = () => {
      if (loginSelected) return 'Username or Email';
      if (registerSelected) return 'Username';
      return 'Email';
    };

    const mainInputName = loginSelected ? 'user' : 'email';

    return (
      <Form onSubmit={this.handleSubmit}>
        <SelectList plainList>
          {PANELS.map(PANEL => (
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
          position={(registerSelected && 'left') || (resetSelected && 'right')}
        />
        <Label for={mainInputName}>
          Enter {mainInputText()}
        </Label>
        {/* TODO: CUSTOM username || email validator */}
        <Input
          innerRef={(node) => { this.mainInput = node; }}
          name={mainInputName}
          placeholder={mainInputText()}
        />
        <Label for="email">
          Enter email
        </Label>
        <Input
          innerRef={(node) => { this.mainInput = node; }}
          name="email"
          type="email"
          placeholder="Email"
          isHidden={notRegisterSelected}
        />
        <Label for="password">
          Enter account password
        </Label>
        <Input
          name="password"
          type="password"
          placeholder="Password"
          isHidden={resetSelected}
        />
        <Label for="confirmPassword">
          Confirm account password
        </Label>
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          isHidden={notRegisterSelected}
        />
        <ApiInput isHidden={notRegisterSelected}>
          <Label for="apiKey">
            Enter WaniKani API key
          </Label>
          <Input
            name="apiKey"
            placeholder="WaniKani API key"
            isHidden={notRegisterSelected}
          />
          <ApiLink
            title="Get WK API key"
            name="HELP"
            color="black"
            href="https://www.wanikani.com/settings/account#public-api-key"
            isHidden={notRegisterSelected}
            external
          >
          </ApiLink>
        </ApiInput>
        <SubmitButton type="submit">
          {registerSelected && 'Create Account'}
          {loginSelected && '行こう'}
          {resetSelected && 'Reset Password'}
        </SubmitButton>
      </Form>
    );
  }
}

export default MultiLogin;
