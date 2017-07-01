import React from 'react';
import PropTypes from 'prop-types';
import { rgba } from 'polished';
// import styled from 'styled-components';
import { purpleLight, purpleDark } from 'shared/styles/colors';

import Dmak from 'shared/assets/scripts/dmak-0-3-1';
// TODO: add dmak functions as KanjiStroke class functions
// dmak options and var initializations as KanjiStroke state
// remove Dmak script, import single function from Raphael that's used here

class KanjiStroke extends React.PureComponent {
  static propTypes = {
    character: PropTypes.string,
  }
  componentDidMount() {
    const dmak = new Dmak(this.props.character, {
      element: this.drawRef,
      step: 0.008,
      stroke: { attr: { active: purpleDark, stroke: rgba(purpleLight, 0.7) } },
      grid: { show: false },
    });
    setTimeout(() => (dmak.pause(), dmak.erase()), 9000);
  }
  render() {
    return (
      <div ref={(node) => { this.drawRef = node; }}></div>
    );
  }
}

export default KanjiStroke;
