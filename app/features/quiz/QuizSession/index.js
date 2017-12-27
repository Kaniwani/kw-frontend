import React from "react";

// import QuizInfo from "old/features/QuizInfo";
import Aux from "common/components/Aux";
import QuizHeader from "./QuizHeader";
import QuizAnswer from "./QuizAnswer";
import QuizQuestion from "./QuizQuestion";
import QuizControls from "./QuizControls";
import backgroundImage from "common/assets/img/reviews.svg";

import { Upper, Lower, Background } from "./styles";

export function QuizSession() {
  return (
    <Aux>
      <Upper>
        <QuizHeader />
        <QuizQuestion />
        <QuizAnswer />
      </Upper>
      <Lower>
        <QuizControls
          onWrapUp={() => window.alert("todo")}
          onInfo={() => window.alert("todo")}
          onSynonym={() => window.alert("todo")}
        />
        {/* <QuizInfo category={category} /> */}
        <Background imgSrc={backgroundImage} />
      </Lower>
    </Aux>
  );
}

export default QuizSession;
