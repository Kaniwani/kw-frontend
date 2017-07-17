import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isKanji } from 'wanakana';
import merge from 'lodash/merge';

import { selectSettings } from 'containers/App/selectors';

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
    settings: {},
  }

  state = {
    dmak: {},
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
    this.instantiateSvg(onlyKanjiChars, this.state.config);
  }

  play = () => this.state.dmak.render()
  pause = () => this.state.dmak.pause()
  erase = () => this.state.dmak.erase()
  stepBack = () => this.state.dmak.eraseLastStrokes(1)
  stepForward = () => this.state.dmak.renderNextStrokes(1)

  instantiateSvg(char, config) {
    const options = merge({}, config, this.props.settings, { element: this.drawRef });
    const dmakInstance = dmak(char, options);
    this.setState(() => ({ dmak: dmakInstance }));
  }

  render() {
    return (
      <Wrapper>
        <Canvas>
          <div ref={(node) => { this.drawRef = node; }}></div>
        </Canvas>
        <Controls>
          <ControlButton name="SKIP_PREV" title="Step backwards" onClick={this.stepBack} />
          <ControlButton name="RESTART" size="1.3em" title="Erase drawing" onClick={this.erase} />
          <ControlButton name="PLAY" title="Play drawing" onClick={this.play} />
          <ControlButton name="PAUSE" title="Pause drawing" onClick={this.pause} />
          <ControlButton name="SKIP_NEXT" title="Step forwards" onClick={this.stepForward} />
        </Controls>
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  settings: selectSettings,
});

export default connect(mapStateToProps)(KanjiStroke);
