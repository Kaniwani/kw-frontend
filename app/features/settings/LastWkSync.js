import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { distanceInWordsToNow } from "date-fns";

import { selectLastWkSyncDate } from "features/user/selectors";

import Element from "common/components/Element";
// import Button from "common/components/Button";
import H5 from "common/components/H5";
import P from "common/components/P";

LastWkSync.propTypes = {
  lastWkSyncDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.oneOf([false]),
  ]).isRequired,
};

export function LastWkSync({ lastWkSyncDate }) {
  return (
    <Element flexRow>
      <H5>Last Sync with WaniKani:</H5>
      <P>
        {distanceInWordsToNow(lastWkSyncDate, {
          includeSeconds: true,
          suffix: true,
        })}
        {" ago"}
      </P>
      {
        // TODO: allow user to force syncing?
        // limit to once per x hours?
        /* <Element>
        <Button disabled onClick={syncWithWanikani}>Sync Now</Button>
      </Element> */
      }
    </Element>
  );
}

const mapStateToProps = (state) => ({
  lastWkSyncDate: selectLastWkSyncDate(state),
});

// const mapDispatchToProps = ({
//   syncWithWanikani: user.wksync.request,
// });

export default connect(mapStateToProps)(LastWkSync);
