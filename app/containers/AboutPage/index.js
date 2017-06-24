import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';


function AboutPage() {
  return (
    <div>
      <Helmet
        title="AboutPage"
        meta={[
          { name: 'description', content: 'Description of AboutPage' },
        ]}
      />
    <h1>Hello AboutPage</h1>
    </div>
  );
}

AboutPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(AboutPage);
