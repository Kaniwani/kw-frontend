import React, { PropTypes } from 'react';
import cuid from 'cuid';

const ItemList = ({ ranks }) => (
  // TODO: clean this up, uggh
  <section>
    {Object.entries(ranks).map(([rank, list]) =>
      (list.length > 0) && (
        <div key={cuid()}>
          <h2>{rank}</h2>
          <ul>
            {list.map(({ vocabulary }) => (
              <li key={cuid()} className="vocab-card">
                <div className="vocab-base">
                  {/* FIXME: need pk id on vocab coming from review endpoint
                    to create <Link to=`/vocabulary/${vocabulary.pkid}` />*/}
                  <a href="#vocabitem" className="readingset">
                    <div className="ja">
                      {vocabulary.readings.map(({ kana, character }) => (
                        <span key={cuid()}>
                          <span lang="ja" className="kana">{ kana }</span>
                          <span lang="ja" className="kanji">{ character }</span>
                        </span>
                        ))}
                    </div>
                    <div className="meaning">{ vocabulary.meaning }</div>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
    ))}
  </section>
);

ItemList.propTypes = {
  ranks: PropTypes.object.isRequired,
};

const PlaceHolder = ({ correct }) => (
  // this is flipped because we want to show this in relation to the opposing section
  !correct ?
    <h3 className="title"><span lang="ja">満点！ </span> (๑•̀ㅂ•́)و</h3> :
    <h3 className="title"><span lang="ja">零点... 残念だよ </span> (๑◕︵◕๑)</h3>
);

PlaceHolder.propTypes = {
  correct: PropTypes.bool.isRequired,
};

const SummarySection = ({ items, correct }) => (
  <section>
    <h2 className="title">{`${items.count} ${correct ? 'Correct' : 'Incorrect'}`}</h2>
    { items.count ? <ItemList ranks={items.ranks} /> : <PlaceHolder correct={correct} /> }
  </section>
);


SummarySection.propTypes = {
  items: PropTypes.object.isRequired,
  correct: PropTypes.bool.isRequired,
};

export default SummarySection;
