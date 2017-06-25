import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import makeSelectVocabLevelPage from './selectors';

export class VocabLevelPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div>
        <Helmet
          title="VocabLevelPage"
          meta={[
            { name: 'description', content: 'Description of VocabLevelPage' },
          ]}
        />
      <h1>Hello VocabLevelPage</h1>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  VocabLevelPage: makeSelectVocabLevelPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VocabLevelPage);
