import React from "react";
// import ReactInterval from "react-interval";

// import Container from 'base/Container';
import QuizSummaryHeader from "components/QuizSummaryHeader";

class DevPage extends React.Component {
  state = {};
  // updateState = () =>
  //   this.setState((prevState) => ({ }));

  // TODO: vocablist/vocablistranked tooltip id generation

  render() {
    return (
      <div>
        <QuizSummaryHeader
          heading="Lessons Summary"
          linkText="Begin Session"
          count={2222}
          sessionRoute="/lessons/session"
          onResetSummary={() => window.alert('reset')}
        />
      </div>
    );
  }
}

export default DevPage;
