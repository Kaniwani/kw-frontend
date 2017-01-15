import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector, createSelector } from 'reselect';
import cuid from 'cuid';
import InfoPanel from './InfoPanel';
import { Wrapper, PanelWrapper } from './styles';
import AddSynonymPanel from './AddSynonymPanel';
import { ReviewEntryRecord, PanelsRecord } from 'shared/models';
import { PANELS } from 'shared/constants';
import { selectPanels } from 'containers/ReviewSession/selectors';

const renderPanels = ({ items, ...props }) =>
  items.map((item) =>
    <InfoPanel key={cuid()} item={item} {...props} />);

export class ReviewInfo extends React.Component {
  static propTypes = {
    item: PropTypes.instanceOf(ReviewEntryRecord),
    panels: PropTypes.instanceOf(PanelsRecord),
    panelToShow: PropTypes.oneOf(Object.values(PANELS)),
  }

  static defaultProps = {
    detailLevel: 1,
  }

  render() {
    const { panelToShow, panels: { info } } = this.props;
    let content = null;
    if (panelToShow === PANELS.NOTES) {
      content = (
        <Wrapper >
          <PanelWrapper>
            <p>Hello Notes</p>
          </PanelWrapper>
        </Wrapper>
      );
    }
    // TODO: scroll to panel like WK does (componentDidUpdate -> visible)
    if (panelToShow === PANELS.INFO) {
      const { item: { vocabulary: { readings, synonyms } } } = this.props;
      content = (
        <Wrapper className={info.detail === 1 && 'is-low-detail'} >
          {readings && renderPanels({ items: readings, category: 'Reading', detailLevel: info.detail })}
          {synonyms && renderPanels({ items: synonyms, category: 'Synonym', detailLevel: info.detail })}
        </Wrapper>
      );
    }
    if (panelToShow === PANELS.SETTINGS) {
      content = (
        <Wrapper >
          <PanelWrapper>
            <p>Hello Settings</p>
          </PanelWrapper>
        </Wrapper>
      );
    }
    // TODO: scroll to panel like WK does (componentDidUpdate -> visible)
    if (panelToShow === PANELS.SYNONYM) {
      content = (
        <Wrapper>
          <AddSynonymPanel addPadding={info.detail > 2} />
        </Wrapper>
      );
    }
    return content;
  }
}

const mapStateToProps = createStructuredSelector({
  panels: selectPanels,
  panelToShow: createSelector([selectPanels], (panels) => panels.show),
});

export default connect(mapStateToProps)(ReviewInfo);
