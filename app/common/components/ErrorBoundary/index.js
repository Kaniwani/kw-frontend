import styled from 'styled-components';
import React from 'react';
import Raven from 'common/raven';

import { IS_PROD_ENV } from 'common/constants';
import A from 'common/components/A';
import NotFoundPage from 'pages/NotFoundPage';

const Box = styled.div`
  padding: 1rem;
`;

class ErrorBoundary extends React.Component {
  state = { error: null };

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    if (IS_PROD_ENV) {
      Raven.captureException(error, { extra: errorInfo });
    }
  }

  render() {
    if (this.state.error) {
      return IS_PROD_ENV ? (
        // eslint-disable-next-line
        <div
          style={{ minHeight: '100vh', minWidth: '100vw' }}
          className="snap"
          onClick={() => Raven.lastEventId() && Raven.showReportDialog()}
        >
          <NotFoundPage>
            <div>
              <h1>A wild error has appeared!</h1>
              <h2>
                Please try reloading the application, or{' '}
                <A href="#report">let us know exactly what happened</A>.
              </h2>
            </div>
          </NotFoundPage>
        </div>
      ) : (
        <Box>
          <Box>
            <h5>MESSAGE</h5>
            <p>{this.state.error.message}</p>
          </Box>
          <Box>
            <h5>STACK</h5>
            <p>{this.state.error.stack}</p>
          </Box>
          <Box>
            <h5>COMPONENTSTACK</h5>
            <p>{this.state.errorInfo.componentStack}</p>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
