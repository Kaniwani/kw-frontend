import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bind, unbind } from 'wanakana';

import { onlyKanjiOrKana, onlyKana } from 'common/validations';
import synonyms from 'features/synonyms/actions';
import { selectSynonymsSubmitting } from 'features/synonyms/selectors';

import AddSynonymField from './AddSynonymField';
import Button from 'common/components/Button';

import { blue } from 'common/styles/colors';
import { Form } from './styles';

export const ANSWER_TYPES = {
  WORD: 'WORD',
  READING: 'READING',
};

export class AddSynonymForm extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired, // associated review id
    answerValue: PropTypes.string,
    answerType: PropTypes.oneOf([...Object.keys(ANSWER_TYPES), '']),
    initialValues: PropTypes.shape({
      word: PropTypes.string,
      reading: PropTypes.string,
    }),
    onSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    centerButton: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    answerValue: '',
    answerType: '',
    initialValues: {
      word: '',
      reading: '',
    },
  };

  state = {
    errors: {
      word: undefined,
      reading: undefined,
    },
  };

  componentDidMount() {
    this.wordInputRef.value = this.props.initialValues.word;
    this.readingInputRef.value = this.props.initialValues.reading;
    bind(this.wordInputRef);
    bind(this.readingInputRef);
  }

  componentWillUnmount() {
    unbind(this.wordInputRef);
    unbind(this.readingInputRef);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const word = this.wordInputRef.value;
    const reading = this.readingInputRef.value;
    const errors = {
      word: onlyKanjiOrKana(word),
      reading: onlyKana(reading),
    };
    this.setState({ errors });

    if (Object.values(errors).some(Boolean)) {
      return;
    }

    this.props.onSubmit({
      review: this.props.id,
      word,
      reading,
    });
  };

  handleRef = (name) => (node) => {
    this[name] = node;
  };

  render() {
    const { answerValue, answerType, submitting, centerButton } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <AddSynonymField
          name="word"
          type="text"
          label={ANSWER_TYPES.WORD}
          userAnswer={answerValue}
          answerType={answerType}
          handleRef={this.handleRef('wordInputRef')}
          error={this.state.errors.word}
        />
        <AddSynonymField
          name="reading"
          type="text"
          component={AddSynonymField}
          label={ANSWER_TYPES.READING}
          userAnswer={answerValue}
          answerType={answerType}
          handleRef={this.handleRef('readingInputRef')}
          error={this.state.errors.reading}
        />
        <Button
          style={{ alignSelf: centerButton ? 'center' : 'flex-start' }}
          type="submit"
          title="Add Synonym"
          colorHover={blue[3]}
          bgColor={blue[3]}
          disabled={submitting}
        >
          {submitting ? 'Adding Synonym' : 'Add Synonym'}
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  submitting: selectSynonymsSubmitting(state),
});

const mapDispatchToProps = {
  onSubmit: synonyms.add.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSynonymForm);
