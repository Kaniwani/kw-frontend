import React, { PropTypes } from 'react';
import { Row, Column } from 'hedron';
import cuid from 'cuid';
import List from 'components/List';
import Wrapper from './Wrapper';

const testComp = ({ item }) => { // eslint-disable-line react/prop-types
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

export const ReviewInfo = ({ readings }) => (
  <Wrapper>
    <List items={readings} component={testComp} />
    <div>
      <h5>Example Sentence</h5>
      <p lang="ja">{readings.getIn([0, 'sentence_ja'])}</p>
      <p>{readings.getIn([0, 'sentence_en'])}</p>
    </div>
  </Wrapper>
  );

ReviewInfo.propTypes = {
  readings: PropTypes.object.isRequired,
};

export default ReviewInfo;
