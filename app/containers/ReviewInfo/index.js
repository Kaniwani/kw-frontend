import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Column } from 'hedron';
import cuid from 'cuid';
import List from 'components/List';
import { toggleVocabInfo } from 'containers/ReviewInfo/actions';
import Wrapper from './Wrapper';

import {
  selectAnswerMatches,
} from './selectors';

export class ReviewInfo extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    readings: PropTypes.object.isRequired,
    toggleInfo: PropTypes.func.isRequired,
  }

  _toggleInfo() {
    this.props.toggleInfo();
  }

  render() {
    const { readings } = this.props;

    const testComp = ({ item }) => {
      const char = item.get('character');
      const kana = item.get('kana');
      const tags = item.get('tags');
      const jlpt = item.get('jlpt');
      const common = item.get('common');

      return (
        <li>
          <Row>
            <Column>
              <span style={{ fontSize: 24 }}>
                <strong><span>{char}</span></strong>
                <span>{kana}</span>
              </span>
              {tags && tags.map((tag) => <span key={cuid()}>{tag}</span>)}
              {jlpt && <span>{jlpt}</span>}
              {common && <span>Common</span>}
            </Column>
          </Row>
        </li>
      );
    };


    return (
      <Wrapper>
        {/* // TODO: SectionList instead */}
        <List items={readings} component={testComp} />
        <div>
          <h5>Example Sentence</h5>
          <p lang="ja">{readings.getIn([0, 'sentence_ja'])}</p>
          <p>{readings.getIn([0, 'sentence_en'])}</p>
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isAnswerCorrect: selectAnswerMatches(),
});

function mapDispatchToProps(dispatch) {
  return {
    toggleInfo: () => dispatch(toggleVocabInfo()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewInfo);
