// FORMERLY QUIZINFO
import React from "react";
import PropTypes from "prop-types";
import cuid from "cuid";

import VocabWord from "components/VocabWord";
import TagsList from "components/TagsList";
import SentencePair from "components/SentencePair";
import StrokeLoader from "components/StrokeLoader";
import ReadingLinks from "components/ReadingLinks";
import PitchDiagramList from "components/PitchDiagramList";
import Notes from "components/Notes";
import VocabLockButton from "components/VocabLockButton";

// FIXME: infopanel needs to implement scroll to top when open
// import { withContentRect } from 'react-measure';
// import smoothScrollY from 'utils/smoothScrollY';

// TODO: spacing between words, synonym title?

VocabDetail.propTypes = {
  words: PropTypes.array.isRequired,
  synonyms: PropTypes.array,
  isLocked: PropTypes.bool,
  centered: PropTypes.bool,
  showTags: PropTypes.bool,
  showLinks: PropTypes.bool,
  showSentence: PropTypes.bool,
  showPitch: PropTypes.bool,
  showStroke: PropTypes.bool,
  showNotes: PropTypes.bool,
  showLock: PropTypes.bool,
};

VocabDetail.defaultProps = {
  synonyms: [],
  centered: false,
  isLocked: false,
  showTags: true,
  showLinks: true,
  showSentence: true,
  showPitch: true,
  showStroke: true,
  showNotes: true,
  showLock: true,
};

function VocabDetail({
  words,
  synonyms,
  centered,
  isLocked,
  showTags,
  showLinks,
  showSentence,
  showPitch,
  showStroke,
  showNotes,
  showLock,
  ...props
}) {
  // FIXME: rebass Box
  const style = centered
    ? {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    }
    : {};
  return (
    <div style={style} {...props}>
      {words.map((word) => (
        <div key={cuid()} style={style}>
          {<VocabWord {...word} />}
          {showTags && <TagsList {...word} />}
          {showLinks && <ReadingLinks {...word} />}
          {showSentence && <SentencePair {...word} />}
          {showPitch && <PitchDiagramList {...word} />}
          {showStroke && <StrokeLoader {...word} />}
          {showNotes && (
            <Notes
              initialValue={word.notes}
              onSubmit={(value) => console.log("Notes submit value was: ", value)}
            />
          )}
        </div>
      ))}
      {synonyms.map((word) => (
        <div style={style} key={cuid()}>
          <VocabWord {...word} />
        </div>
      ))}
      {showLock && (
        <VocabLockButton isLocked={isLocked} onClick={() => console.log("Lock Vocab")} />
      )}
    </div>
  );
}

export default VocabDetail;
