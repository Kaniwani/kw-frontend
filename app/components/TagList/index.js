import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Immutable from 'immutable';
import { media } from 'shared/styles/media';
import { fluidType } from 'shared/styles/utils';
import { borderRadius } from 'shared/styles/sizing';
import cuid from 'cuid';
import Chip from 'components/Chip';
import Icon from 'components/Icon';
import Ul from 'components/List/Ul';

const selectColor = (item) => {
  if (/common/i.test(item)) {
    return {
      bgColor: 'blue',
      textColor: 'whiteLight',
    };
  }
  if (/jlpt/i.test(item)) {
    return {
      bgColor: 'tan',
    };
  }
  return {};
};

const StyledUl = styled(Ul)`
  ${media('min').md`
    & > .expand-toggle {
      transition: all 200ms ease-in;
      transform: translateX(-2em) rotate(90deg);
      opacity: 0;
    }
    &:hover > .expand-toggle {
      transition: all 150ms ease-out;
      transform: translateX(.4em) rotate(90deg);
      opacity: 1;
    }
  `}
`;

const ExpandToggle = styled.li`
  display: inline-flex;
  ${fluidType(10, 16, 300, 1800)}
  border-radius: ${borderRadius};
  transform: rotate(90deg);
  padding: .4em .25em;
  cursor: pointer;
  &:hover {
    background-color: rgba(0,0,0, .2);
  }
`;

const TagList = ({ className, items, withToggle }) => (
  <StyledUl className={className} >
    {items.map((item) => (
      <Chip key={cuid()} item={item} {...selectColor(item)} />
    ))}
    {withToggle && (
      <ExpandToggle className="expand-toggle" onClick={() => console.info('TODO: implement expand/contract taglist')}>
        <Icon name="CONTRACT" size="1.5em" />
      </ExpandToggle>
    )}
  </StyledUl>
);

TagList.defaultProps = {
  withToggle: false,
};

TagList.propTypes = {
  className: PropTypes.string,
  withToggle: PropTypes.bool,
  items: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.instanceOf(Immutable.Iterable),
  ]).isRequired,
};

export default TagList;
