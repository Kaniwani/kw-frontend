import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { titleCase } from 'voca';
import { get } from 'lodash';
import styled from 'styled-components';
import Network from 'react-network';
import { isBefore, addMinutes } from 'date-fns';
import { Fixed, Overlay, Flex } from 'rebass';

import OFFLINE_IMG from 'common/assets/loops/running.jpg';
import OFFLINE_MP4 from 'common/assets/loops/running.mp4';
import OFFLINE_WEBM from 'common/assets/loops/running.webm';

import VideoBanner from 'common/components/VideoBanner';
import Element from 'common/components/Element';
import H1 from 'common/components/H1';
import Button from 'common/components/Button';

import quiz from 'features/quiz/actions';
import { selectCompleteCount } from 'features/quiz/QuizSession/selectors';
import { selectLastActivityDate } from 'features/quiz/QuizSummary/selectors';

import QuizSession from 'features/quiz/QuizSession';
// match review background image svg color
import { backgroundImageColor } from 'features/quiz/QuizSession/styles';
import { ReactInterval } from 'react-interval/lib/Component';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${backgroundImageColor};
  min-height: 100vh;
  /* Edge/IE11 is overflowing for some reason, unable to trace the culprit */
  overflow-x: hidden;
`;

const TimeoutOverlay = () => (
  <div style={{ position: 'relative', zIndex: '100' }}>
    <Fixed top={0} right={0} bottom={0} left={0} />
    <Overlay w={['300px', '80vw', '720px']}>
      <Flex flexDirection="column" justify="center" alignItems="center">
        <Element>
          <H1>Session Timeout</H1>
        </Element>
        <Element>
          <Button onClick={() => window.location.reload(true)}>Refresh?</Button>
        </Element>
      </Flex>
    </Overlay>
  </div>
);

export class QuizSessionPage extends React.Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    setSessionCategory: PropTypes.func.isRequired,
    loadQueue: PropTypes.func.isRequired,
    completeCount: PropTypes.number.isRequired,
    lastActivityDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.oneOf([false])])
      .isRequired,
  };

  state = { timedOut: false };

  componentWillMount() {
    this.props.setSessionCategory(this.props.category);
  }

  componentDidMount() {
    this.props.loadQueue(this.props.category);
  }

  checkTimeOut = () => {
    if (
      this.props.completeCount >= 1 &&
      isBefore(this.props.lastActivityDate, addMinutes(new Date(), -10))
    ) {
      this.setState({ timedOut: true });
    }
  };

  render() {
    const { category } = this.props;
    const pageTitle = `${titleCase(category)} Session`;

    return (
      <Wrapper>
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={pageTitle} />
        </Helmet>
        <Network
          render={({ online }) => (
            <Fragment>
              {!online && (
                <VideoBanner
                  sources={{ mp4: OFFLINE_MP4, webm: OFFLINE_WEBM, jpg: OFFLINE_IMG }}
                  headerText="Connection lost!"
                  subHeaderText="Please reconnect to continue using Kaniwani."
                />
              )}
              {online && (
                <Fragment>
                  <QuizSession category={category} />
                  <ReactInterval enabled timeout={10000} callback={this.checkTimeOut} />
                  {this.state.timedOut && <TimeoutOverlay />}
                </Fragment>
              )}
            </Fragment>
          )}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, props) => {
  const category = get(props, 'match.params.category');
  return {
    category,
    lastActivityDate: selectLastActivityDate(state, { category }),
    completeCount: selectCompleteCount(state, { category }),
  };
};

const mapDispatchToProps = {
  setSessionCategory: quiz.session.setCategory,
  loadQueue: quiz.session.queue.load.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizSessionPage);
