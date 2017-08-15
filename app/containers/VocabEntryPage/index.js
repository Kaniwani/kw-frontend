import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { selectIdFromMatch } from 'containers/App/selectors';
import actions from 'containers/App/actions';
import PageWrapper from 'base/PageWrapper';

import VocabEntryMeanings from 'components/VocabEntryMeanings';
import VocabEntryReadings from 'components/VocabEntryReadings';
import VocabEntrySynonyms from 'components/VocabEntrySynonyms';
import VocabEntryNotes from 'components/VocabEntryNotes';
import VocabEntryDetails from './VocabEntryDetails';

import { Row, Column } from './styles';

export class VocabEntryPage extends React.Component {
  static propTypes = {
    loadReview: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
  }

  componentDidMount() {
    this.props.loadReview(this.props.id);
  }

  render() {
    const { id } = this.props;
    return (
      <div>
        <Helmet>
          <title>Vocabulary: Entry</title>
          <meta name="description" content="Kaniwani Vocabulary: Entry" />
        </Helmet>
        <PageWrapper>
          <Row>
            <Column>
              <VocabEntryMeanings id={id} />
              <VocabEntryReadings id={id} />
              <VocabEntrySynonyms id={id} />
              <VocabEntryNotes id={id} />
            </Column>
            <Column>
              <VocabEntryDetails id={id} />
            </Column>
          </Row>
        </PageWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  id: selectIdFromMatch(props),
});

const mapDispatchToProps = (dispatch) => ({
  loadReview: (id) => dispatch(actions.review.load.request({ id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabEntryPage);
