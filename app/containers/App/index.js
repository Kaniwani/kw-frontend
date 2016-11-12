/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

const gutter = '1rem';
const AppWrapper = styled.div`
  max-width: calc(768px + ${gutter} * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 ${gutter};
  flex-direction: column;
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
  children: React.PropTypes.node,
};

export default App;
