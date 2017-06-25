import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import makeSelectVocabEntryPage from './selectors';

export class VocabEntryPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div>
        <Helmet
          title="VocabEntryPage"
          meta={[
            { name: 'description', content: 'Description of VocabEntryPage' },
          ]}
        />
      <h1>Hello VocabEntryPage</h1>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  VocabEntryPage: makeSelectVocabEntryPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VocabEntryPage);
