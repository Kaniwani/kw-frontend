import Raphael from 'raphael';
import merge from 'lodash/merge';

//  Draw Me A Kanji - v0.3.1
//  A funny drawer for your Japanese writings
//  http://drawmeakanji.com

// MODIFIED SOURCE - updating version will need careful merging - @DJTB
// 3rd party code so...
/* eslint-disable */

const defaultOptions = {
  uri: 'http://kanjivg.tagaini.net/kanjivg/kanji/',
  skipLoad: false,
  autoplay: false,
  height: 200,
  width: 200,
  viewBox: {
    x: 0,
    y: 0,
    w: 110,
    h: 110,
  },
  step: 0.01,
  stroke: {
    animated: {
      drawing: true,
      erasing: true,
    },
    order: {
      visible: false,
      attr: {
        'font-size': 10,
        fill: '#2a2a2a',
      },
    },
    attr: {
      active: 'tomato',
      stroke: 'crimson',
      'stroke-width': 4,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    },
  },
  grid: {
    show: true,
    attr: {
      stroke: '#ccc',
      'stroke-width': 0.5,
      'stroke-dasharray': '--',
    },
  },
  loaded: () => {},
  erased: () => {},
  drew: () => {},
  finishedCallback: () => {},
};

function Dmak(text, config) {
  const options = merge({}, defaultOptions, config);
  let strokes = [];
  let papers = [];
  let pointer = 0;
  const timeouts = {
    play: [],
    erasing: [],
    drawing: [],
  };

  const prepare = (data) => {
    strokes = preprocessStrokes(data, options);
    papers = giveBirthToRaphael(data.length, options);
    if (options.grid.show) {
      showGrid(papers, options);
    }
  };

  // Clean all strokes on papers.
  const erase = (end = 0) => {
    // 1. Cannot have two rendering process for the same draw. Keep it cool.
    // 2. Don't go behind the beginning.
    if (timeouts.play.length || pointer <= 0) {
      return;
    }

    do {
      pointer -= 1;
      eraseStroke(strokes[pointer], timeouts.erasing, options);

      // Execute custom callback "erased" here
      options.erased(pointer);
    } while (pointer > end);

  };

  // All the magic happens here.
  const render = (end) => {
    // Cannot have two rendering process for
    // the same draw. Keep it cool.
    if (timeouts.play.length) {
      return;
    }

    if (end == null) {
      end = strokes.length;
    } else if (end > strokes.length) {
      return;
    }

    const cb = () => {
      drawStroke(papers[strokes[pointer].char], strokes[pointer], timeouts.drawing, options);

      // Execute custom callback "drew" here
      options.drew(pointer);

      pointer += 1;
      timeouts.play.shift();
    };
    let delay = 0;

    // Before drawing clear any remaining erasing timeouts
    for (let i = 0; i < timeouts.erasing.length; i += 1) {
      clearTimeout(timeouts.erasing[i]);
      timeouts.erasing = [];
    }

    for (let i = pointer; i < end; i += 1) {
      if (!options.stroke.animated.drawing || delay <= 0) {
        cb(this);
      } else {
        timeouts.play.push(setTimeout(cb, delay, this));
      }
      delay += strokes[i].duration;
    }
  };

  // Pause rendering
  const pause = () => {
    for (let i = 0; i < timeouts.play.length; i += 1) {
      clearTimeout(timeouts.play[i]);
    }
    timeouts.play = [];
    return;
  };

  // Wrap the erase function to remove the x last strokes.
  const eraseLastStrokes = (nbStrokes) => {
    erase(pointer - nbStrokes);
  };

  // Wrap the render function to render the x next strokes.
  const renderNextStrokes = (nbStrokes) => {
    render(pointer + nbStrokes);
  };

  if (!options.skipLoad) {
    const loader = new DmakLoader(options.uri);

    loader.load(text, (data) => {
      prepare(data);

      // Execute custom callback "loaded" here
      options.loaded(strokes);

      if (options.autoplay) {
        render();
      }
    });
  }

  return {
    erase,
    pause,
    render,
    eraseLastStrokes,
    renderNextStrokes,
  }
}

// HELPERS

// Flattens the array of strokes ; 3D > 2D and does some preprocessing while
// looping through all the strokes:
//  - Maps to a character index
//  - Calculates path length

function preprocessStrokes(data, options) {
  const strokes = [];
  let stroke;
  let length;

  for (let i = 0; i < data.length; i += 1) {
    for (let j = 0; j < data[i].length; j += 1) {
      length = Raphael.getTotalLength(data[i][j].path);
      stroke = {
        char: i,
        length,
        duration: length * options.step * 1000,
        path: data[i][j].path,
        groups: data[i][j].groups,
        text: data[i][j].text,
        object: {
          path: null,
          text: null,
        },
      };
      strokes.push(stroke);
    }
  }

  return strokes;
}


// Init Raphael paper objects
function giveBirthToRaphael(nbChar, options) {
  const papers = [];
  let paper;

  for (let i = 0; i < nbChar; i += 1) {
    paper = new Raphael(options.element, `${options.width}px`, `${options.height}px`);
    paper.setViewBox(options.viewBox.x, options.viewBox.y, options.viewBox.w, options.viewBox.h);
    paper.canvas.setAttribute('class', 'dmak-svg');
    papers.push(paper);
  }
  return papers.reverse();
}


// Draw the background grid
function showGrid(papers, options) {
  for (let i = 0; i < papers.length; i += 1) {
    papers[i].path(`M${options.viewBox.w / 2},0 L${options.viewBox.w / 2},${options.viewBox.h}`).attr(options.grid.attr);
    papers[i].path(`M0,${options.viewBox.h / 2} L${options.viewBox.w},${options.viewBox.h / 2}`).attr(options.grid.attr);
  }
}


// Remove a single stroke ; deletion can be animated if set as so.
function eraseStroke(stroke, timeouts, options) {
  // In some cases the text object may be null:
  //  - Stroke order display disabled
  //  - Stroke already deleted
  if (stroke.object.text !== null) {
    stroke.object.text.remove();
  }

  function cb() {
    stroke.object.path.remove();

    // Finally properly prepare the object variable
    stroke.object = {
      path: null,
      text: null,
    };

    timeouts.shift();
  }

  if (options.stroke.animated.erasing) {
    stroke.object.path.node.style.stroke = options.stroke.attr.active;
    timeouts.push(animateStroke(stroke, -1, options, cb));
  } else {
    cb();
  }
}


// Draw a single stroke ; drawing can be animated if set as so.
function drawStroke(paper, stroke, timeouts, options) {
  function cb() {
    // The stroke object may have been already erased when we reach this timeout
    if (stroke.object.path === null) {
      return;
    }

    let color = options.stroke.attr.stroke;
    if (options.stroke.attr.stroke === 'random') {
      color = Raphael.getColor();
    }

    // Revert back to the default color.
    stroke.object.path.node.style.stroke = color;
    stroke.object.path.node.style.transition = stroke.object.path.node.style.WebkitTransition = 'stroke 400ms ease';

    timeouts.shift();
  }

  stroke.object.path = paper.path(stroke.path);
  stroke.object.path.attr(options.stroke.attr);

  if (options.stroke.order.visible) {
    showStrokeOrder(paper, stroke, options);
  }

  if (options.stroke.animated.drawing) {
    animateStroke(stroke, 1, options, cb);
  } else {
    cb();
  }
}


// Draw a single next to

function showStrokeOrder(paper, stroke, options) {
  stroke.object.text = paper.text(stroke.text.x, stroke.text.y, stroke.text.value);
  stroke.object.text.attr(options.stroke.order.attr);
}


// Animate stroke drawing.
// Based on the great article wrote by Jake Archibald
// http://jakearchibald.com/2013/animated-line-drawing-svg/
function animateStroke(stroke, direction, options, callback) {
  stroke.object.path.attr({ stroke: options.stroke.attr.active });
  stroke.object.path.node.style.transition = stroke.object.path.node.style.WebkitTransition = 'none';

  // Set up the starting positions
  stroke.object.path.node.style.strokeDasharray = `${stroke.length} ${stroke.length}`;
  stroke.object.path.node.style.strokeDashoffset = (direction > 0) ? stroke.length : 0;

  // Trigger a layout so styles are calculated & the browser
  // picks up the starting position before animating
  stroke.object.path.node.getBoundingClientRect();
  stroke.object.path.node.style.transition = stroke.object.path.node.style.WebkitTransition = `stroke-dashoffset ${stroke.duration}ms ease`;

  // Go!
  stroke.object.path.node.style.strokeDashoffset = (direction > 0) ? '0' : stroke.length;

  // Execute the callback once the animation is done
  // and return the timeout id.
  return setTimeout(callback, stroke.duration);
}

// Create a safe reference to the DrawMeAKanji object for use below.
const DmakLoader = function (uri) {
  this.uri = uri;
};


// Gather SVG data information for a given set of characters.
// By default this action is done while instanciating the Word
// object, but it can be skipped, see above

DmakLoader.prototype.load = function (text, callback) {
  let paths = [],
    nbChar = text.length,
    done = 0,
    i,
    callbacks = {
      done(index, data) {
        paths[index] = data;
        done += 1;
        if (done === nbChar) {
          callback(paths);
        }
      },
      error(msg) {
        console.log('Error', msg);
      },
    };

  for (i = 0; i < nbChar; i += 1) {
    loadSvg(this.uri, i, text.charCodeAt(i).toString(16), callbacks);
  }
};


// Try to load a SVG file matching the given char code.
// @thanks to the incredible work made by KanjiVG
// @see: http://kanjivg.tagaini.net

function loadSvg(uri, index, charCode, callbacks) {
  const xhr = new XMLHttpRequest();
  const code = (`00000${charCode}`).slice(-5);

  // Skip space character
  if (code === '00020' || code === '03000') {
    callbacks.done(index, {
      paths: [],
      texts: [],
    });
    return;
  }

  xhr.open('GET', `${uri + code}.svg`, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callbacks.done(index, parseResponse(xhr.response, code));
      } else {
        callbacks.error(xhr.statusText);
      }
    }
  };
  xhr.send();
}


// Simple parser to extract paths and texts data.
function parseResponse(response, code) {
  const data = [];
  const dom = new DOMParser().parseFromString(response, 'application/xml');
  const texts = dom.querySelectorAll('text');
  const groups = [];

  // Private recursive function to parse DOM content
  function __parse(element) {
    const children = element.childNodes;

    for (let i = 0; i < children.length; i += 1) {
      if (children[i].tagName === 'g') {
        groups.push(children[i].getAttribute('id'));
        __parse(children[i]);
        groups.splice(groups.indexOf(children[i].getAttribute('id')), 1);
      } else if (children[i].tagName === 'path') {
        data.push({
          path: children[i].getAttribute('d'),
          groups: groups.slice(0),
        });
      }
    }
  }

      // Start parsing
  __parse(dom.getElementById(`kvg:${code}`));

      // And finally add order mark information
  for (let i = 0; i < texts.length; i += 1) {
    data[i].text = {
      value: texts[i].textContent,
      x: texts[i].getAttribute('transform').split(' ')[4],
      y: texts[i].getAttribute('transform').split(' ')[5].replace(')', ''),
    };
  }

  return data;
}

export default Dmak;
