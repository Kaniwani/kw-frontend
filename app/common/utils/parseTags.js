import { TAGS } from 'common/constants';

const parseTags = (tags = []) =>
  tags.reduce((list, tag) => {
    if (!Object.keys(TAGS).includes(tag)) {
      console.warn(`Invalid tag "${tag}" passed to parseTags()`); // eslint-disable-line no-console
      return list;
    }
    return list.concat(TAGS[tag]);
  }, []);

export default parseTags;
