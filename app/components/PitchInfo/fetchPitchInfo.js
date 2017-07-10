// TODO: crawl for pitch info instead

let vocabPitchType = -1;

export default function fetchPitchInfo(character) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `http://www.weblio.jp/content/${character}`, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        parseResponse(xhr.response);
      } else {
        console.error('Error fetching pitch data', xhr.statusText);
      }
    }
  };
  xhr.send();
}

function parseResponse(responseObj, character) {
  const dparser = new DOMParser();
  const respDoc = dparser.parseFromString(responseObj.responseText, 'text/html').documentElement;
  const vocabResults = respDoc.getElementsByClassName('midashigo');

  if (vocabResults != null) {
    vocabResults.forEach((result) => {
      const title = result.getAttribute('title');
      const readings = result.textContent.replace(/\s+/g, '').replace('・', '');
      debugger;
      if (title === character && kana.some((k) => readings.includes(k))) {
        const spans = result.getElementsByTagName('span');
        if (spans != null) {
          let numMatch;
          let numMatch2;
          for (let s = 0; s < spans.length; s++) {
            const spanText = spans[s].textContent;
            if (spanText.includes('［')) {
              const parseNum = parseInt(spanText.match(/\d+/g));
              if (numMatch == null) {
                numMatch = parseNum;
              } else if (numMatch2 == null) {
                numMatch2 = parseNum;
                break;
              }
            }
          }
          if (numMatch != null) {
            vocabPitchType = numMatch;
            return [vocabPitchType, numMatch, numMatch2];
          }
        }
      }
    });
  }
}
