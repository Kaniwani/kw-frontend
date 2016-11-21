/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0 auto;
  min-height: 100%;
`;

function App(props) {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Kaniwani"
        defaultTitle="Kaniwani"
        meta={[
          { name: 'description', content: 'Kaniwani, An English to Japanese SRS Quiz' },
        ]}
      />

      {React.Children.toArray(props.children)}

    </AppWrapper>
  );
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
