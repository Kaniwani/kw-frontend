import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { get } from 'lodash';
import { titleCase } from 'voca';

import Aux from 'common/components/Aux';
import quiz from 'features/quiz/actions';
import QuizSummary from 'features/quiz/QuizSummary';

export class QuizSummaryPage extends React.Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    setSessionCategory: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.setSessionCategory(this.props.category);
  }

  render() {
    const pageTitle = titleCase(this.props.category);
    return (
      <Aux>
        <Helmet>
          <title>{`${pageTitle} Summary`}</title>
          <meta name="description" content={`Kaniwani ${pageTitle} Summary`} />
        </Helmet>
        <QuizSummary category={this.props.category} />
      </Aux>
    );
  }
}
const mapStateToProps = (state, props) => ({
  category: get(props, 'match.params.category'),
});

const mapDispatchToProps = {
  setSessionCategory: quiz.session.setCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizSummaryPage);
