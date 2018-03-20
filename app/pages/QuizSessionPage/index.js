import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { titleCase } from 'voca';
import { get } from 'lodash';
import styled from 'styled-components';
import Network from 'react-network';

import OFFLINE_IMG from 'common/assets/loops/running.jpg';
import OFFLINE_MP4 from 'common/assets/loops/running.mp4';
import OFFLINE_WEBM from 'common/assets/loops/running.webm';

import VideoBanner from 'common/components/VideoBanner';

import quiz from 'features/quiz/actions';

import QuizSession from 'features/quiz/QuizSession';
// match review background image svg color
import { backgroundImageColor } from 'features/quiz/QuizSession/styles';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${backgroundImageColor};
  min-height: 100vh;
  /* Edge/IE11 is overflowing for some reason, unable to trace the culprit */
  overflow-x: hidden;
`;

export class QuizSessionPage extends React.Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    setSessionCategory: PropTypes.func.isRequired,
    loadQueue: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.setSessionCategory(this.props.category);
  }

  componentDidMount() {
    this.props.loadQueue(this.props.category);
  }

  render() {
    const pageTitle = `${titleCase(this.props.category)} Session`;

    return (
      <Wrapper>
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={pageTitle} />
        </Helmet>
        <QuizSession category={this.props.category} />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, props) => ({
  category: get(props, 'match.params.category'),
});

const mapDispatchToProps = {
  setSessionCategory: quiz.session.setCategory,
  loadQueue: quiz.session.queue.load.request,
};

export default connect(mapStateToProps, mapDispatchToProps)((props) => (
  <Network
    render={({ online }) => (
      <Fragment>
        {online && <QuizSessionPage {...props} />}
        {!online && (
          <VideoBanner
            sources={{ mp4: OFFLINE_MP4, webm: OFFLINE_WEBM, jpg: OFFLINE_IMG }}
            headerText="Connection lost!"
            subHeaderText="Please reconnect to continue using Kaniwani."
          />
        )}
      </Fragment>
    )}
  />
));
