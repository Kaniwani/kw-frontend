import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import * as globalActions from 'containers/App/actions';
import { makeSelectLevel, makeSelectReviews } from 'containers/App/selectors';
import makeSelectVocabLevelPage from './selectors';

export class VocabLevelPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    level: PropTypes.array,
    reviews: PropTypes.array,
    levelLoad: PropTypes.func.isRequired,
    reviewsLoad: PropTypes.func.isRequired,
  }

  static defaultProps = {
    level: [],
    reviews: [],
  }

  componentDidMount() {
    // TODO: ask tadgh for custom stubbed reviews api point?
    this.props.levelLoad();
    this.props.reviewsLoad();
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
        <h1>Vocab api response</h1>
        <pre><code className="language-javascript">{this.props.level.length && JSON.stringify(this.props.level.slice(0, 1), null, 2)}</code></pre>
        <h1>Review api response</h1>
        <pre><code className="language-javascript">{this.props.reviews.length && JSON.stringify(this.props.reviews.slice(0, 1), null, 2)}</code></pre>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  VocabLevelPage: makeSelectVocabLevelPage(),
  level: makeSelectLevel(),
  reviews: makeSelectReviews(),
});

function mapDispatchToProps(dispatch, { match: { params } }) {
  return {
    levelLoad: () => dispatch(globalActions.levelLoad({ level: params.id })),
    reviewsLoad: () => dispatch(globalActions.reviewsLoad()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VocabLevelPage);
