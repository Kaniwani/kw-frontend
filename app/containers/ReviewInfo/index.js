import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import cuid from 'cuid';
import InfoPanel from './InfoPanel';
import { Wrapper } from './styles';
import AddSynonymPanel from './AddSynonymPanel';

import {
  selectInfoAddSynonymVisible,
  selectInfoDetailLevel,
  selectInfoPanelsVisible,
} from './selectors';

const renderPanels = ({ items, ...props }) =>
  items.map((item) =>
    <InfoPanel key={cuid()} item={item} {...props} />);

export class ReviewInfo extends React.Component {
  static propTypes = {
    readings: PropTypes.instanceOf(Immutable.Iterable).isRequired,
    synonyms: PropTypes.instanceOf(Immutable.Iterable),
    isAddSynonymVisible: PropTypes.bool.isRequired,
    detailLevel: PropTypes.number.isRequired,
    isPanelsVisible: PropTypes.bool.isRequired,
  }

  render() {
    const { readings, synonyms, isPanelsVisible, isAddSynonymVisible, detailLevel } = this.props;
    let content = null;

    if (isPanelsVisible) {
      content = (
        <Wrapper className={detailLevel === 1 && 'is-low-detail'} >
          {readings && renderPanels({ items: readings, category: 'Reading', detailLevel })}
          {synonyms && renderPanels({ items: synonyms, category: 'Synonym', detailLevel })}
        </Wrapper>
      );
    }
    if (isAddSynonymVisible) {
      content = (
        <Wrapper>
          <AddSynonymPanel addPadding={detailLevel > 2} />
        </Wrapper>
      );
    }
    return content;
  }
}

const mapStateToProps = createStructuredSelector({
  isAddSynonymVisible: selectInfoAddSynonymVisible(),
  detailLevel: selectInfoDetailLevel(),
  isPanelsVisible: selectInfoPanelsVisible(),
});

export default connect(mapStateToProps)(ReviewInfo);
