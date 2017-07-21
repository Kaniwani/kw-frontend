import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import titleCase from 'voca/title_case';

import { selectCategoryFromMatch } from 'containers/App/selectors';

import backgroundImage from 'shared/assets/img/reviews.svg';
import QuizInfo from 'containers/QuizInfo';
import QuizAnswer from 'containers/QuizAnswer';
import QuizHeader from 'components/QuizHeader';
import QuizQuestion from 'components/QuizQuestion';
import { Wrapper, Upper, Lower, Background } from './styles';

QuizPage.propTypes = {
  category: PropTypes.string.isRequired,
};

// import { SRS_RANKS, KEYCODES } from 'shared/constants';

/*
getKeyHandler = (keycode) => ({
  [KEYCODES.ENTER]: this.props.recordAnswer,
  [KEYCODES.SPACE]: this.props.cycleInfoDetail,
  [KEYCODES.N_LOWERCASE]: () => this.props.showPanel('notes'),
  [KEYCODES.F_LOWERCASE]: () => this.props.showPanel('info'),
  [KEYCODES.S_LOWERCASE]: () => this.props.showPanel('synonym'),
  [KEYCODES.I_LOWERCASE]: this.handleIgnore,
  [KEYCODES.BACKSPACE]: this.handleIgnore,
  [KEYCODES.FORWARD_SLASH]: this.handleIgnore,
}[keycode])

handleKeyDown = (event) => {
  const action = this.getKeyHandler(event.keyCode);
  if (this.props.answer.disabled && action) {
    blockEvent(event);
    action();
  }
}
*/

function QuizPage({ category }) {
  const title = `${titleCase(category)} Session`;
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`Kaniwani ${title}`} />
      </Helmet>
      <Wrapper>
        <Upper>
          <QuizHeader category={category} />
          <QuizQuestion category={category} />
        </Upper>
        <Lower>
          {/* <ReviewAnswerContainer category={category} /> */}
          <QuizAnswer category={category} />
          <QuizInfo category={category} />
          <Background imgSrc={backgroundImage} />
        </Lower>
      </Wrapper>
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  category: selectCategoryFromMatch(props),
});

export default connect(mapStateToProps)(QuizPage);
