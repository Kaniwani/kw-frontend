import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import cuid from 'cuid';
import selectSummaryPage from './selectors';

export class SummaryPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    completed: PropTypes.object,
    session: PropTypes.object,
  }

  render() {
    return (
      <div>
        <Helmet
          title="SummaryPage"
          meta={[
            { name: 'description', content: 'Description of SummaryPage' },
          ]}
        />
        <ul>{this.props.completed.map((x) => <li key={cuid()}>{JSON.stringify(x)}</li>)}</ul>
        <p>{JSON.stringify(this.props.session)}</p>
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
