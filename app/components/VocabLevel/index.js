import React from "react";
import PropTypes from "prop-types";
import titleCase from "voca/title_case";

import { Wrapper, LevelLink, Title, ItemCount, LockedLabel, Button } from "./styles";

VocabLevel.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  title: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  count: PropTypes.number,
  isLocked: PropTypes.bool,
  isActionable: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  onLock: PropTypes.func,
};

VocabLevel.defaultProps = {
  title: "",
  count: 0,
  isLocked: true,
  isActionable: false,
  isSubmitting: false,
  onLock: () => {},
};

function VocabLevel({
  id, title, count, isLocked, isSubmitting, isActionable, onLock,
}) {
  return (
    <Wrapper isLocked={isLocked} isSubmitting={isSubmitting} isActionable={isActionable}>
      <LevelLink plainLink to={`/vocabulary/levels/${id}`}>
        <Title>{title || titleCase(id)}</Title>
        <ItemCount>{count} entries</ItemCount>
        <LockedLabel>{(isSubmitting && "Syncing") || (isLocked && "Locked")}</LockedLabel>
      </LevelLink>
      <Button
        id={id}
        title={isLocked ? 'Unlock' : 'Lock'}
        isLocked={isLocked}
        isSubmitting={isSubmitting}
        isActionable={isActionable}
        onClick={onLock}
      />
    </Wrapper>
  );
}

export default VocabLevel;
