import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'redux';
import { reduxForm, Field, propTypes as formPropTypes } from 'redux-form';
import { connect } from 'react-redux';
import { Fixed, Absolute, Modal, Flex } from 'rebass';

import { orange } from 'common/styles/colors';
import vocab from 'features/vocab/actions';
import { selectVocabById } from 'features/vocab/selectors';

import H3 from 'common/components/H3';
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

export const VocabReport = ({ reading, handleSubmit, reset, submitting, submitSucceeded }) => (
  <Toggle
    render={({ on, toggle }) => (
      <div>
        <IconButton
          name="BUG"
          title="Report vocab"
          size="1.4em"
          color={orange[4]}
          onClick={toggle}
        />
        {on && (
          <div style={{ position: 'relative', zIndex: 10 }}>
            <Fixed top={0} right={0} bottom={0} left={0} onClick={toggle} />
            <Modal w={['320px', '80vw', '720px']}>
              <Absolute top={0} right={0} p={1}>
                <IconButton name="CLOSE" title="Close Report Window" onClick={toggle} />
              </Absolute>
              <Flex justify="center">
                <Form onSubmit={handleSubmit}>
                  <H3 style={{ display: 'flex', alignItems: 'center', fontWeight: 400 }}>
                    <span style={{ marginRight: '.3rem' }}>Report Errata for </span>
                    <span style={{ fontSize: '1.3em' }} lang="ja">
                      {reading.word}
                    </span>
                  </H3>

                  <Field
                    component={TextAreaAutoSize}
                    name="reason"
                    label="Reason"
                    showLabel={false}
                    maxLength={1000}
                    placeholder="The sentence/pitch/furigana seems wrong. I think it should be..."
                    rows={10}
                    showControls="always"
                    onReset={reset}
                    onSubmit={handleSubmit}
                    submitButtonText={
                      (submitting && 'Submitting') || (submitSucceeded && 'Sent!') || 'Submit'
                    }
                  />
                </Form>
              </Flex>
            </Modal>
          </div>
        )}
      </div>
    )}
  />
);

VocabReport.propTypes = {
  ...formPropTypes,
  reading: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => ({
  reading: selectVocabById(state, props),
});

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'vocabReport',
    onSubmit: ({ reason }, dispatch, { reading, ...form }) => dispatch(vocab.report.request({ reason, reading: reading.id }, { form })),
  })
);

export default enhance(VocabReport);
