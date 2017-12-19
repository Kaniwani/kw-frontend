import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import ReactTooltip from "react-tooltip";
import cuid from "cuid";
import { isEqual } from "lodash";

import calculatePercentage from "utils/calculatePercentage";

import Aux from "base/Aux";
import Ul from 'base/Ul';
import VocabCard from "components/VocabCard";
import VocabChip from "components/VocabChip";
import { purple } from "shared/styles/colors";
import { gutter } from "shared/styles/layout";
import './styles'; // NOTE: global styles for tooltip injected


// prettier-ignore
const List = styled(Ul)`
  display: flex;
  flex-flow: row wrap;

  & > * {
    ${({ isCard }) => isCard && gutter({ prop: 'margin', mod: 1 })}
    ${({ isChip }) => isChip && gutter({ prop: 'margin', mod: 0.5 })}
  }
`;

export const ITEM_TYPES = {
  CARD: "CARD",
  CHIP: "CHIP",
};

class VocabList extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      // TODO: fill me in
    })).isRequired,
    itemType: PropTypes.oneOf(Object.values(ITEM_TYPES)),
    color: PropTypes.string,
    tooltipId: PropTypes.string,
  };

  static defaultProps = {
    itemType: ITEM_TYPES.CARD,
    color: purple,
    tooltipId: "VocabListChip",
  };

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  generateToolTip = (item) => {
    const {
      correct, incorrect, primaryMeaning, primaryReading,
    } = item;
    const total = correct + incorrect;
    const previouslyAnswered = total > 0;
    const percent = calculatePercentage(correct, total);
    return `
      <ul>
        <li>
          <span>JA </span>
          <span lang="ja">${primaryReading}</span>
        </li>
        <li>
          <span>EN</span>
          <span>${primaryMeaning}</span>
        </li>
        <li>
          <span>RC</span>
          <span>${
            previouslyAnswered
              ? `${percent}%`
              : "<small>N/A</small>"
          }</span>
        </li>
      </ul>
    `;
  };

  renderTooltip = () => (
    <ReactTooltip id={this.props.tooltipId} className="vocab-tip" html />
  );

  renderCards = (items) =>
    items.map((item) => <VocabCard key={cuid()} bgColor={this.props.color} {...item} />);

  renderChips = (items) =>
    items.map((item) => (
      <VocabChip
        key={cuid()}
        bgColor={this.props.color}
        data-for={this.props.tooltipId}
        data-place="bottom"
        data-tip={this.generateToolTip(item)}
        {...item}
      />
    ));

  render() {
    const { items } = this.props;
    const isCard = this.props.itemType === ITEM_TYPES.CARD;
    const isChip = this.props.itemType === ITEM_TYPES.CHIP;
    return (
      <Aux>
        {isChip && this.renderTooltip()}
        <List plainList isCard={isCard} isChip={isChip}>
          {isCard && this.renderCards(items)}
          {isChip && this.renderChips(items)}
        </List>
      </Aux>
    );
  }
}

export default VocabList;
