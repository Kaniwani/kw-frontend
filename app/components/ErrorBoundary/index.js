import React from 'react';

class ErrorBoundary extends React.Component {
  state = {
    error: false,
  };

  componentDidCatch(error, info) {
    console.group('ComponentDidCatch');
    console.error(error);
    console.log(info);
    console.groupEnd('ComponentDidCatch');
    // TODO: log errors to slack
    // https://sentry.io/for/open-source/
    this.setState((prevState) => ({
      ...prevState,
      error: { error, info },
    }));
  }

  // FIXME: something better - re-use 404 image!
  render() {
    return this.state.error ? (
      <div>
        <h1>A fatal error has occurred!</h1>
        <h2>Please try reloading the application and contact us if it happens again.</h2>
      </div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
