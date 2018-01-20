import React from 'react';
import PropTypes from 'prop-types';
import { isKanji } from 'wanakana';
import { isEqual, merge } from 'lodash';

import { greyLight, blackLight, purpleLight, purpleDark } from 'common/styles/colors';
import { rgba } from 'polished';

import { Wrapper, Canvas, Controls, ControlButton } from './styles';
import dmak from './dmak-0-3-1';

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

  state = {
    dmak: {},
    playing: false,
    erasing: false,
    config: {
      autoplay: true,
      stroke: {
        order: { attr: { fill: blackLight } },
        attr: { active: purpleDark, stroke: rgba(purpleLight, 0.7) },
      },
      grid: { attr: { stroke: greyLight } },
    },
  };

  componentDidMount() {
    const onlyKanjiChars = this.props.word
      .split('')
      .filter(isKanji)
      .join('');
    this.instantiateSvg(
      onlyKanjiChars,
      merge({}, this.state.config, this.props.settings, {
        element: this.drawRef,
        drew: (finished) => finished && this.setState({ playing: false }),
        erased: () => this.setState({ erasing: false }),
      })
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.state, nextState) || !isEqual(this.props, nextProps);
  }

  play = () => {
    this.state.dmak.render();
    this.setState({ playing: true });
  };
  pause = () => {
    this.state.dmak.pause();
    this.setState({ playing: false });
  };
  erase = () => {
    if (this.state.playing) {
      this.pause();
    }
    this.setState({ erasing: true });
    this.state.dmak.erase();
  };
  stepBack = () => this.state.dmak.eraseLastStrokes(1);
  stepForward = () => this.state.dmak.renderNextStrokes(1);

  instantiateSvg(char, config) {
    const dmakInstance = dmak(char, config);
    this.setState({ dmak: dmakInstance, playing: true });
  }

  render() {
    return (
      <Wrapper>
        <Canvas
          innerRef={(node) => {
            this.drawRef = node;
          }}
        />
        <Controls>
          <ControlButton
            name="RESTART"
            size="1.3em"
            title="Erase drawing"
            disabled={this.state.playing}
            onClick={this.erase}
          />
          <ControlButton
            name="SKIP_PREV"
            title="Step backwards"
            disabled={this.state.playing || this.state.erasing}
            onClick={this.stepBack}
          />
          {this.state.playing ? (
            <ControlButton
              name="PAUSE"
              title="Pause drawing"
              disabled={this.state.erasing}
              onClick={this.pause}
            />
          ) : (
            <ControlButton
              name="PLAY"
              title="Play drawing"
              disabled={this.state.erasing}
              onClick={this.play}
            />
          )}
          <ControlButton
            name="SKIP_NEXT"
            title="Step forwards"
            disabled={this.state.playing || this.state.erasing}
            onClick={this.stepForward}
          />
        </Controls>
      </Wrapper>
    );
  }
}

export default KanjiStroke;
