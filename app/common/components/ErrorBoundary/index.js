import React from "react";

import NotFoundPage from "pages/NotFoundPage";

class ErrorBoundary extends React.Component {
  state = {
    error: false,
  };

  componentDidCatch(error, info) {
    console.group("ComponentDidCatch");
    console.error(error);
    console.log(info);
    console.groupEnd("ComponentDidCatch");
    // TODO: log errors to slack
    // https://sentry.io/for/open-source/
    this.setState((prevState) => ({
      ...prevState,
      error: { error, info },
    }));
  }

  render() {
    return this.state.error ? (
      <NotFoundPage>
        <div>
          <h1>A wild error has appeared!</h1>
          <h2>
            Please try reloading the application, or contact us if it happens again.
          </h2>
        </div>
      </NotFoundPage>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
