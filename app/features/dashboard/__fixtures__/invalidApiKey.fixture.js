import { ApiKeyCheck } from 'features/dashboard/ApiKeyCheck';

export default {
  withCosmosWrapper: false,

  url: '/',
  component: ApiKeyCheck,
  props: {
    valid: false,
  },
};
