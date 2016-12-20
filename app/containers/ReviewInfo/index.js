import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Column } from 'hedron';
import List from 'components/List';
import { toggleVocabInfo } from 'containers/ReviewInfo/actions';
import ReviewBackground from './ReviewBackground';
import Wrapper from './Wrapper';
import InfoWrapper from './InfoWrapper';
import Entry from './Entry';

import {
  selectAnswerMatches,
  selectInfoVisible,
} from './selectors';

export class ReviewInfo extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    readings: PropTypes.object.isRequired,
    isInfoVisible: PropTypes.bool,
    isAnswerCorrect: PropTypes.bool.isRequired,
    toggleInfo: PropTypes.func.isRequired,
  }

  _toggleInfo() {
    this.props.toggleInfo();
  }

  render() {
    const { readings, isInfoVisible, isAnswerCorrect } = this.props;

    const testComp = ({ item }) => (
      <Row>
        <Column md={3}>
          <h5>Characters</h5>
          <Entry item={item.get('character')} />
        </Column>
        <Column md={3}>
          <h5>Kana</h5>
          <Entry item={item.get('kana')} />
        </Column>
        <Column md={3}>
          <h5>Parts of Speech</h5>
          <List items={item.get('tags')} component={Entry} />
        </Column>
        <Column md={3}>
          <h5>Sentence</h5>
          <Entry lang="ja" item={item.get('sentence_ja')} />
          <Entry item={item.get('sentence_en')} />
        </Column>
        <Column md={3}>
          <h5>Tags</h5>
          <Entry item={item.get('jlpt')} />
          <Entry item={item.get('common') && 'Common'} />
        </Column>
      </Row>
    );

    return (
      <Wrapper>
        {isInfoVisible && (
        <InfoWrapper>
          {/* readings: [
            {
              character: 'お誕生日おめでとう',
              kana: 'おたんじょうびおめでとう',
              level: 17,
              tags: [
                'Intransitive verb', 'Godan verb',
              ],
              sentence_en: 'She smoothly and elegantly poured the water into the glass.',
              sentence_ja: '滞りのない優雅な仕草でグラスに水を注ぎ込んだ',
              jlpt: 'JLPT N1',
              common: false,
            },
          ], */}
          <List items={readings} component={testComp} />
        </InfoWrapper>
        )}
        <ReviewBackground />
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isAnswerCorrect: selectAnswerMatches(),
  isInfoVisible: selectInfoVisible(),
});

function mapDispatchToProps(dispatch) {
  return {
    toggleInfo: (payload) => dispatch(toggleVocabInfo()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewInfo);
