import { SubmissionError } from "redux-form";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockOnSubmit = (mockErrors = {}) => (values) => sleep(1000).then(() => {
  // simulate server latency
  if (Object.keys(mockErrors).length) {
    throw new SubmissionError(mockErrors);
  } else {
    window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`); // eslint-disable-line no-alert
  }
});

export default mockOnSubmit;
