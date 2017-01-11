/*
 *
 * SettingsPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectSettingsPage from './selectors';
import Container from 'components/Container';
import H1 from 'components/H1';

export class SettingsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Settings"
          meta={[{ name: 'description', content: 'KaniWani Settings' }]}
        />
        <Container>
          <H1>Settings</H1>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = selectSettingsPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
