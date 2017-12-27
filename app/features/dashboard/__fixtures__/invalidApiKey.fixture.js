import { ApiKeyCheck } from 'features/dashboard/ApiKeyCheck';

export default {
  withCosmosWrapper: false,
  withCosmosXRay: false,
  url: '/',
  component: ApiKeyCheck,
  props: {
    valid: false,
  },
};
