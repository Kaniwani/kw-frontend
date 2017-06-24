import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';


function ContactPage() {
  return (
    <div>
      <Helmet
        title="ContactPage"
        meta={[
          { name: 'description', content: 'Description of ContactPage' },
        ]}
      />
    <h1>Hello ContactPage</h1>
    </div>
  );
}

ContactPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(ContactPage);
