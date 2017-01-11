/*
 *
 * AboutPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectAboutPage from './selectors';
import H1 from 'components/H1';
import Container from 'components/Container';

export class AboutPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="About"
          meta={[{ name: 'description', content: 'About KaniWani' }]}
        />
        <Container>
          <H1>About</H1>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = selectAboutPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
