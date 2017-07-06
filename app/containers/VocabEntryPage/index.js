import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import uuid from 'uuid';

import * as globalActions from 'containers/App/actions';
import PageWrapper from 'base/PageWrapper';
import VocabPageHeader from 'components/VocabPageHeader';
import VocabEntryDetail from 'components/VocabEntryDetail';
import { makeSelectReview, makeSelectSettings } from 'containers/App/selectors';
import KanjiStroke from 'components/KanjiStroke';
import makeSelectVocabEntryPage from './selectors';

export class VocabEntryPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    entry: PropTypes.object,
    settings: PropTypes.object,
    reviewLoad: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.reviewLoad();
  }

  render() {
    const { entry } = this.props;
    const primaryReading = entry && entry.vocabulary && entry.readings && entry.readings[0] || { level: 'derp', character: 'herp' };
    const PAGE_TITLE = `Vocabulary > Level ${primaryReading.level} > ${primaryReading.character}`;
    return (
      <div>
        <Helmet>
          <title>{PAGE_TITLE}</title>
          <meta name="description" content={`Kaniwani ${PAGE_TITLE}`} />
        </Helmet>
        <PageWrapper>
          {entry && (
          <div>
            <VocabPageHeader
              pageTitle={PAGE_TITLE}
              withVocabListToggle={false}
            />
            {entry.vocabulary.readings.map((reading) =>
              <KanjiStroke key={uuid()} character={reading.character} settings={this.props.settings.kanjiStroke} />
            )}
            <VocabEntryDetail
              entry={{ ...entry.vocabulary, synonyms: entry.synonyms }}
              primaryReading={primaryReading}
            />
          </div>
        )}
        </PageWrapper>
        <pre><code className="language-javascript">{entry && JSON.stringify(entry, null, 2)}</code></pre>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  VocabEntryPage: makeSelectVocabEntryPage(),
  entry: makeSelectReview(),
  settings: makeSelectSettings(),
});

function mapDispatchToProps(dispatch, { match: { params } }) {
  return {
    reviewLoad: () => dispatch(globalActions.reviewLoadRequest({ id: params.id })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VocabEntryPage);
