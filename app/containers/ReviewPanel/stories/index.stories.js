import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ReviewPanel from '../index';

storiesOf('components.ReviewPanel', module)
  .add('single ReviewPanel with default props', () => (
    <ReviewPanel
      reviewEntry={{
        id: 12,
        vocabulary: {
          id: 553,
          meaning: 'before long, soon',
          readings: [
            {
              id: 582,
              character: '近々',
              kana: 'ちかぢか',
              level: 7,
              tags: [
                'Noun',
              ],
              sentenceEn: 'When I saw them on a date, I asked them, “Do I hear wedding bells?”',
              sentenceJa: '彼らがデートをしているのを見かけて近々結婚するのってきいたんだ',
              jlpt: 'JLPT N2',
              common: true,
            },
            {
              id: 583,
              character: '近々',
              kana: 'きんきん',
              level: 7,
              tags: [
                'Noun',
              ],
              sentenceEn: 'When I saw them on a date, I asked them, “Do I hear wedding bells?”',
              sentenceJa: '彼らがデートをしているのを見かけて近々結婚するのってきいたんだ',
              jlpt: 'JLPT N2',
              common: true,
            },
            {
              id: 584,
              character: '近々',
              kana: 'ちかじか',
              level: 7,
              tags: [
                'Noun',
              ],
              sentenceEn: 'When I saw them on a date, I asked them, “Do I hear wedding bells?”',
              sentenceJa: '彼らがデートをしているのを見かけて近々結婚するのってきいたんだ',
              jlpt: 'JLPT N2',
              common: true,
            },
          ],
        },
      }}
    />
  ));