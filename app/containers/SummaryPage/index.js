import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectSummaryPage from './selectors';

export class SummaryPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="SummaryPage"
          meta={[
            { name: 'description', content: 'Description of SummaryPage' },
          ]}
        />
        <h1> I am summary </h1>
      </div>
    );
  }
}

const mapStateToProps = selectSummaryPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage);
