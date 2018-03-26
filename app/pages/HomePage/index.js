import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import user from 'features/user/actions';

import PageWrapper from 'common/components/PageWrapper';
import Dashboard from 'features/dashboard';

class HomePage extends React.PureComponent {
  static propTypes = {
    loadUser: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="Kaniwani Dashboard Page" />
        </Helmet>
        <PageWrapper>
          <Dashboard />
        </PageWrapper>
      </Fragment>
    );
  }
}

const mapDispatchToProps = {
  loadUser: user.load.request,
};

export default connect(null, mapDispatchToProps)(HomePage);
