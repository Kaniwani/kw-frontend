import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'redux';
import { reduxForm, Field, propTypes as formPropTypes } from 'redux-form';
import { connect } from 'react-redux';
import { Fixed, Absolute, Overlay, Flex } from 'rebass';

import vocab from 'features/vocab/actions';
import { selectVocabById } from 'features/vocab/selectors';

import IconButton from 'common/components/IconButton';
import TextAreaAutoSize from 'common/components/TextAreaAutoSize';
import Toggle from 'common/components/Toggle';

const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  max-width: 900px;
  min-width: 320px;
`;

export const VocabReport = ({ vocabulary, handleSubmit, reset, submitting }) => (
  <Toggle
    render={({ on, toggle }) => (
      <div style={{ zIndex: 10 }}>
        <IconButton name="BUG" title="Report vocab" color="tomato" onClick={toggle} />
        {on && (
          <div>
            <Fixed top right bottom left onClick={toggle} />
            <Overlay w={['320px', '80vw', '720px']}>
              <Absolute top right p={1}>
                <IconButton name="CLOSE" title="Close Add Synonym window" onClick={toggle} />
              </Absolute>
              <Flex justify="center">
                <Form onSubmit={handleSubmit}>
                  <h3 style={{ verticalAlign: 'middle' }}>
                    <span>Report Errata for </span>
                    <span style={{ fontSize: '1.3em', fontWeight: '400' }} lang="ja">
                      {vocabulary.word}
                    </span>
                  </h3>

                  <Field
                    component={TextAreaAutoSize}
                    name="reason"
                    label="Reason:"
                    maxLength={1000}
                    placeholder="The sentence/pitch/furigana seems wrong. I think it should be..."
                    rows={10}
                    showControls="always"
                    showLabel
                    onReset={reset}
                    onSubmit={handleSubmit}
                    submitButtonText={(submitting && 'Submitting') || 'Send'}
                  />
                </Form>
              </Flex>
            </Overlay>
          </div>
        )}
      </div>
    )}
  />
);

VocabReport.propTypes = {
  ...formPropTypes,
  vocabulary: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => ({
  vocabulary: selectVocabById(state, props),
});

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'vocabReport',
    onSubmit: ({ reason }, dispatch, { vocabulary }) =>
      dispatch(vocab.report.request({ reason, vocabulary: vocabulary.id })),
  })
);

export default enhance(VocabReport);
