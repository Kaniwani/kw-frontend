import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { titleCase } from "voca";

import vocab from "features/vocab/actions";
import {
  selectVocabLevelIsSubmitting,
  selectVocabLevelIsActionable,
  selectVocabLevelById,
} from "features/vocab/Levels/selectors";

import { Wrapper, Link, Title, ItemCount, LockedLabel, Button } from "./styles";

LevelLink.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  title: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  count: PropTypes.number.isRequired,
  isLocked: PropTypes.bool.isRequired,
  isActionable: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleLock: PropTypes.func.isRequired,
  handleUnLock: PropTypes.func.isRequired,
};

LevelLink.defaultProps = {
  title: "",
};

const confirmText =
  "This will reset your KW SRS for this level.\n Are you sure you want to continue?";

export function LevelLink({
  id,
  title,
  count,
  isLocked,
  isSubmitting,
  isActionable,
  handleLock,
  handleUnLock,
}) {
  /* eslint-disable no-alert */
  const onLock = () => {
    if (isActionable && !isLocked && window.confirm(confirmText)) {
      handleLock(id);
    } else if (isActionable && isLocked) {
      handleUnLock(id);
    }
  };
  return (
    <Wrapper isLocked={isLocked} isSubmitting={isSubmitting} isActionable={isActionable}>
      <Link to={`/vocabulary/levels/${id}`} tabIndex={isActionable ? 0 : -1}>
        <Title>{title || titleCase(id)}</Title>
        <ItemCount>{count} entries</ItemCount>
        <LockedLabel>{(isSubmitting && "Syncing") || (isLocked && "Locked")}</LockedLabel>
      </Link>
      <Button
        title={isLocked ? "Unlock" : "Lock"}
        isLocked={isLocked}
        isSubmitting={isSubmitting}
        isActionable={isActionable}
        onClick={onLock}
      />
    </Wrapper>
  );
}

const makeMapStateToProps = () => (state, props) => ({
  ...selectVocabLevelById(state, props),
  isSubmitting: selectVocabLevelIsSubmitting(state, props),
  isActionable: selectVocabLevelIsActionable(state, props),
});

const mapDispatchToProps = (dispatch, { id }) => ({
  handleLock: () => dispatch(vocab.level.lock.request({ id })),
  handleUnLock: () => dispatch(vocab.level.unlock.request({ id })),
});

export default connect(makeMapStateToProps, mapDispatchToProps)(LevelLink);
