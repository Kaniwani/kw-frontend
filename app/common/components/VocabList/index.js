import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import cuid from 'cuid';

import Aux from 'common/components/Aux';
import Ul from 'common/components/Ul';
import VocabCard from './VocabCard';
import VocabChip from './VocabChip';
import { purple } from 'common/styles/colors';
import { gutter } from 'common/styles/layout';
import { media } from 'common/styles/media';
import './styles'; // NOTE: global styles for tooltip injected

// prettier-ignore
const List = styled(Ul)`
  display: flex;
  flex-flow: row wrap;

  & > * {
    &:only-child {
      flex-grow: 0;
    }
    ${({ isCard }) => isCard && gutter({ prop: 'margin', mod: 0.8 })}
    ${({ isChip }) => isChip && gutter({ prop: 'margin', mod: 0.5 })}
    ${media('max').sm`
      flex-basis: 100%;
    `}
  }
`;

export const ITEM_TYPES = {
  CARD: 'CARD',
  CHIP: 'CHIP',
};

// FIXME: stateless?
export class VocabList extends React.Component {
  static propTypes = {
    ids: PropTypes.arrayOf(PropTypes.number).isRequired,
    itemType: PropTypes.oneOf(Object.values(ITEM_TYPES)),
    withSrsColors: PropTypes.bool,
    showSecondary: PropTypes.bool,
    showFuri: PropTypes.bool,
    color: PropTypes.string,
    tooltipSuffix: PropTypes.string,
  };

  static defaultProps = {
    itemType: ITEM_TYPES.CARD,
    showSecondary: false,
    showFuri: false,
    withSrsColors: false,
    color: purple[5],
    tooltipSuffix: cuid(),
  };

  renderTooltipManager = (tooltipId) => <ReactTooltip id={tooltipId} className="vocab-tip" html />;

  renderCards = (ids) =>
    ids.map((id) => (
      <VocabCard
        key={cuid()}
        id={id}
        bgColor={this.props.color}
        withSrsColors={this.props.withSrsColors}
        showSecondary={this.props.showSecondary}
        showFuri={this.props.showFuri}
      />
    ));

  renderChips = (ids, tooltipId) =>
    ids.map((id) => (
      <VocabChip
        key={cuid()}
        id={id}
        withSrsColors={this.props.withSrsColors}
        bgColor={this.props.color}
        data-for={tooltipId}
        data-place="bottom"
      />
    ));

  render() {
    const { ids, itemType, tooltipSuffix } = this.props;
    const tooltipId = `VL-${tooltipSuffix}`;
    const isCard = itemType === ITEM_TYPES.CARD;
    const isChip = itemType === ITEM_TYPES.CHIP;
    return (
      <Aux>
        {isChip && this.renderTooltipManager(tooltipId)}
        <List plainList isCard={isCard} isChip={isChip}>
          {isChip && this.renderChips(ids, tooltipId)}
          {isCard && this.renderCards(ids)}
        </List>
      </Aux>
    );
  }
}

export default VocabList;
