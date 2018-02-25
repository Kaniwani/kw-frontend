import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { get } from 'lodash';
import { titleCase } from 'voca';

import Aux from 'common/components/Aux';
import user from 'features/user/actions';
import quiz from 'features/quiz/actions';
import QuizSummarySections from 'features/quiz/QuizSummary/QuizSummarySections';

export class QuizSummaryPage extends React.Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    setSessionCategory: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
    fromSession: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.props.setSessionCategory(this.props.category);
    if (this.props.fromSession) {
      this.props.loadUser();
    }
  }

  render() {
    const pageTitle = titleCase(this.props.category);
    return (
      <Aux>
        <Helmet>
          <title>{`${pageTitle} Summary`}</title>
          <meta name="description" content={`Kaniwani ${pageTitle} Summary`} />
        </Helmet>
        {/* QuizSummaryHeader rendered via SiteHeader route match */}
        <QuizSummarySections category={this.props.category} />
      </Aux>
    );
  }
}
const mapStateToProps = (state, props) => ({
  category: get(props, 'match.params.category'),
  fromSession: /session/.test(get(state, 'app.fromPath')),
});

const mapDispatchToProps = {
  setSessionCategory: quiz.session.setCategory,
  loadUser: user.load.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizSummaryPage);
