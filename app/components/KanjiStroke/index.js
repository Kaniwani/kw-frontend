import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { isKanji } from 'wanakana';
import { isEqual, merge } from 'lodash';

import { selectVocabularySettings } from 'components/App/selectors';

import { greyLight, blackLight, purpleLight, purpleDark } from 'shared/styles/colors';
import { rgba } from 'polished';

import { Wrapper, Canvas, Controls, ControlButton } from './styles';
import dmak from './dmak-0-3-1';

class KanjiStroke extends React.PureComponent {
  static propTypes = {
    character: PropTypes.string.isRequired,
    settings: PropTypes.object,
  }

  static defaultProps = {
    settings: {
      autoplay: true,
    },
  }

  state = {
    dmak: {},
    playing: false,
    config: {
      stroke: {
        order: { attr: { fill: blackLight } },
        attr: { active: purpleDark, stroke: rgba(purpleLight, 0.7) },
      },
      grid: { attr: { stroke: greyLight } },
    },
  }

  componentDidMount() {
    const onlyKanjiChars = this.props.character.split('').filter(isKanji).join('');
    this.instantiateSvg(
      onlyKanjiChars,
      merge(
        {},
        this.state.config,
        this.props.settings,
        { element: this.drawRef, drew: (finished) => finished && this.setState({ playing: false }) },
      )
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.state, nextState) || !isEqual(this.props, nextProps);
  }

  play = () => {
    this.state.dmak.render();
    this.setState({ playing: true });
  }
  pause = () => {
    this.state.dmak.pause();
    this.setState({ playing: false });
  }
  erase = () => {
    if (this.state.playing) {
      this.pause();
    }
    this.state.dmak.erase();
  }
  stepBack = () => this.state.dmak.eraseLastStrokes(1)
  stepForward = () => this.state.dmak.renderNextStrokes(1)

  instantiateSvg(char, config) {
    const dmakInstance = dmak(char, config);
    this.setState(() => ({ dmak: dmakInstance, playing: this.props.settings.autoplay }));
  }

  render() {
    return (
      <Wrapper>
        <Canvas innerRef={(node) => { this.drawRef = node; }}></Canvas>
        <Controls>
          <ControlButton name="RESTART" size="1.3em" title="Erase drawing" onClick={this.erase} />
          <ControlButton name="SKIP_PREV" title="Step backwards" onClick={this.stepBack} />
          { this.state.playing ?
            <ControlButton name="PAUSE" title="Pause drawing" onClick={this.pause} /> :
            <ControlButton name="PLAY" title="Play drawing" onClick={this.play} />
          }
          <ControlButton name="SKIP_NEXT" title="Step forwards" onClick={this.stepForward} />
        </Controls>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, props) => ({
  settings: createSelector(selectVocabularySettings, (settings) => Object.assign({}, settings.kanjiStroke, props.settings))(state),
});

export default connect(mapStateToProps)(KanjiStroke);
