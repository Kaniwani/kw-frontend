import React from "react";
import { Wrapper } from "./styles";
import FormSelector from "./FormSelector";
import Form from "./Form";

class MultiLogin extends React.Component {
  state = {
    activePanel: "Login",
    panels: ["Register", "Login", "Reset"],
  };

  setActivePanel = (activePanel) => {
    this.setState({ activePanel });
  };

  isActivePanel = (panel) => this.state.activePanel === panel;

  render() {
    const selections = {
      registerSelected: this.isActivePanel("Register"),
      loginSelected: this.isActivePanel("Login"),
      resetSelected: this.isActivePanel("Reset"),
    };

    return (
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
