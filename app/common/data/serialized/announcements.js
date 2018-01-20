import faker from 'faker/locale/en';
import { range } from 'lodash';

const makeAnnouncements = (n) => range(n).map(() => ({
  title: faker.lorem.sentence(),
  body: `
    <div>
      <p>${faker.lorem.sentences()}</p>
    </div>
  `,
  pubDate: faker.date.past(),
}));

export default makeAnnouncements(15);
