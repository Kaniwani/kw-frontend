import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import * as globalActions from 'containers/App/actions';
import PageWrapper from 'base/PageWrapper';
import { makeSelectReview } from 'containers/App/selectors';
import KanjiStroke from 'components/KanjiStroke';
import makeSelectVocabEntryPage from './selectors';

export class VocabEntryPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    entry: PropTypes.object,
    reviewLoad: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.reviewLoad();
  }

  render() {
    return (
      <PageWrapper>
        <Helmet
          title="VocabEntryPage"
          meta={[{ name: 'description', content: 'Description of VocabEntryPage' }]}
        />
        <h1>Hello VocabEntryPage</h1>
        {this.props.entry && <KanjiStroke character={this.props.entry.vocabulary.readings[0].character} />}
        <pre><code className="language-javascript">{this.props.entry && JSON.stringify(this.props.entry, null, 2)}</code></pre>
      </PageWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  VocabEntryPage: makeSelectVocabEntryPage(),
  entry: makeSelectReview(),
});

function mapDispatchToProps(dispatch, { match: { params } }) {
  return {
    reviewLoad: () => dispatch(globalActions.reviewLoad({ id: params.id })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VocabEntryPage);
