import React from 'react';
import PropTypes from 'prop-types';
import { isKanji } from 'wanakana';
import { isEqual, merge } from 'lodash';
import { rgba } from 'polished';

import { grey, black, purple } from 'common/styles/colors';

import { Wrapper, Canvas, Controls, ControlButton } from './styles';
import dmak from './dmak-0-3-1';

const getKanji = (word = '') => word
  .split('')
  .filter(isKanji)
  .join('');

class KanjiStroke extends React.Component {
  static propTypes = {
    word: PropTypes.string.isRequired,
    settings: PropTypes.object,
  };

  static defaultProps = {
    settings: {
      step: 0.01,
      stroke: { order: { visible: false } },
      grid: { show: true },
    },
  };

  defaultSettings = {
    autoplay: true,
    stroke: {
      order: { attr: { fill: black[2] } },
      attr: { active: purple[6], stroke: rgba(purple[4], 0.7) },
    },
    grid: { attr: { stroke: grey[2] } },
  };

  canvasRef = React.createRef();

  state = {
    dmak: {},
    playing: false,
    erasing: false,
    drawn: false,
  };

  componentDidMount() {
    const { settings, word } = this.props;

    this.instantiateSvg(
      getKanji(word),
      merge({}, this.defaultSettings, settings, {
        element: this.canvasRef.current,
        drew: (finished) => finished && this.setState({ playing: false, drawn: true }),
        erased: () => this.setState({ erasing: false, drawn: false }),
      })
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.state, nextState) || !isEqual(this.props, nextProps);
  }

  componentDidUpdate(_, prevState) {
    const shouldLoop = prevState.drawn && prevState.erasing && (!this.state.erasing && !this.state.drawn);

    if (shouldLoop) {
      this.play();
    }
  }

  play = () => {
    if (this.state.drawn) {
      this.state.dmak.erase();
      this.setState({ erasing: true });
    } else {
      this.state.dmak.render();
      this.setState({ playing: true });
    }
  };

  pause = () => {
    this.state.dmak.pause();
    this.setState({ playing: false });
  };

  erase = () => {
    if (this.state.playing) {
      this.pause();
    }
    this.setState({ erasing: true, drawn: false });
    this.state.dmak.erase();
  };

  stepBack = () => this.state.dmak.eraseLastStrokes(1);

  stepForward = () => this.state.dmak.renderNextStrokes(1);

  instantiateSvg(char, settings) {
    const dmakInstance = dmak(char, settings);
    this.setState({ dmak: dmakInstance, playing: true });
  }

  render() {
    const { playing, erasing } = this.state;

    return (
      <Wrapper>
        <Canvas ref={this.canvasRef} />
        <Controls>
          <ControlButton
            name="RESTART"
            size="1.3em"
            title="Erase drawing"
            disabled={playing}
            onClick={this.erase}
          />
          <ControlButton
            name="SKIP_PREV"
            title="Step backwards"
            disabled={playing || erasing}
            onClick={this.stepBack}
          />
          {playing ? (
            <ControlButton
              name="PAUSE"
              title="Pause drawing"
              disabled={erasing}
              onClick={this.pause}
            />
          ) : (
            <ControlButton
              name="PLAY"
              title="Play drawing"
              disabled={erasing}
              onClick={this.play}
            />
          )}
          <ControlButton
            name="SKIP_NEXT"
            title="Step forwards"
            disabled={playing || erasing}
            onClick={this.stepForward}
          />
        </Controls>
      </Wrapper>
    );
  }
}

export default KanjiStroke;
