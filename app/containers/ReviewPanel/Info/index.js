import React from 'react';
import PropTypes from 'prop-types';

import ToggleBar from './ToggleBar';
import InfoPanel from './InfoPanel';
import NotesPanel from './NotesPanel';
import AddSynonymPanel from './AddSynonymPanel';

const PANELS = ['INFO', 'NOTES', 'ADDSYNONYM'];

export class ReviewInfo extends React.PureComponent {
  static propTypes = {
    reviewEntry: PropTypes.object.isRequired,
    detailLevel: PropTypes.number.isRequired,
    panelToShow: PropTypes.oneOf(Object.values(PANELS)).isRequired,
  }

  render() {
    const { reviewEntry, panelToShow, detailLevel } = this.props;

    const renderNotes = () => <NotesPanel reviewEntry={reviewEntry} />;
    const renderInfo = () => <InfoPanel reviewEntry={reviewEntry} detailLevel={detailLevel} />;
    const renderAddSynonym = () => <AddSynonymPanel addPadding={detailLevel !== 'LOW'} />;

    return (
      <div>
        <ToggleBar />
        {panelToShow === PANELS.NOTES && renderNotes()}
        {panelToShow === PANELS.INFO && renderInfo()}
        {panelToShow === PANELS.ADDSYNONYM && renderAddSynonym()}
      </div>
    );
  }
}

// const mapStateToProps = createStructuredSelector({
//   detailLevel: selectDetailLevel,
//   panelToShow: createSelector([selectPanels], (panels) => panels.show),
// });

export default /* connect(mapStateToProps)*/(ReviewInfo);
