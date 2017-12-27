import { branch, renderComponent } from 'recompose';
import Spinner from 'common/components/Spinner';

const showLoadingIf = (test) => branch(
  test,
  renderComponent(Spinner)
);

export default showLoadingIf;
