import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import makeSelectVocabLevelsPage from './selectors';

export class VocabLevelsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div>
        <Helmet
          title="VocabLevelsPage"
          meta={[
            { name: 'description', content: 'Description of VocabLevelsPage' },
          ]}
        />
      <h1>Hello VocabLevelsPage</h1>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  VocabLevelsPage: makeSelectVocabLevelsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VocabLevelsPage);
