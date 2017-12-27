import React from 'react';
import styled, { keyframes } from 'styled-components';

import { transparent } from 'common/styles/colors';
import { gutter } from 'common/styles/layout';

const fadeOut = keyframes`
  50% { opacity: 0; }
`;
const fadeIn = keyframes`
  50% { opacity: 1; }
`;

const LayoutWrapper = styled.div`
  ${gutter({ type: 'outer', mod: 2 })}
  display: flex;
  width: 100%;
  height: 100%;
  flex: 1 0 100%;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const SvgWrapper = styled.div`
  position: relative;
  width: 30vmin;
  height: 20vmin;
  background-repeat: no-repeat;
  background-color: ${transparent};
  transition: all 200ms ease-in-out;
`;

const WalkingCrabigator = styled.svg`
  display: block;
  pointer-events: none;
  transform-origin: 50% 50% 0px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  /* dance crabby dance */
  & path[id*="Step1"] {
    animation: ${fadeOut} 1s steps(1) infinite;
  }
  & path[id*="Step2"] {
    animation: ${fadeIn} 1s steps(1) infinite;
  }
`;

const LoadingCrabigator = () => (
  <LayoutWrapper>
    <SvgWrapper>
      <WalkingCrabigator
        title="Loading Animation"
        width="100%"
        height="100%"
        viewBox="0 0 400 200"
        preserveAspectRatio="xMinYMin meet"
      >
        <path id="eyeBg" fill="#fff" d="M84 30h20v19H84z" />
        <path id="pinkClawStep1" fill="#f36353" d="M135 155c1.3 1.7 0 6.3 0 6.3h-6.3v6.2h-12.4v6.3h-12.5v6.2H85v-6.3H72.5v-12.4h6.3V155H85v-6.3h6.3v-6.2S126 143 135 155zm-43.8 15.6v-3H85v6.2h6.3zm0-28h6.3z" />
        <path id="neckBg" fill="#d0efdb" d="M79 92h44v38H79z" />
        <path id="pinkClawStep2" opacity="0" fill="#f36353" d="M103.8 167.5H91.3v6.3H78.8v-12.6H85V155h6.3v-17l12.8.8z" />
        <path id="shell" fill="#ba8a59" d="M228.8 167.5h-12.6v-6.3H160V155h-13c.4-45.7 1-49 .5-75H160v-6.3h25v-6.2h50v6.3h18.8V80H266v6.3h6.3v6.2h6.3v6.3h6.2v12.5h6.3v12.5h6.6s-.4 5.2 0 12.5c1.6 27.4 4.5 24.5-18.8 25-20.7.3-12-3.8-12.4 6.2h-25z" />
        <path id="headTail" fill="#8ac249" d="M122.5 92.5h-6.3v6.3H78.8v-6.3h-6.2v-6.3H60V80h-6.3v-6.3H41.3v-6.2H35v-6.3h-6.3V55h-6.2V42.5h6.3v-6.3h18.7v6.3h6.3v-6.3h12.5V30h12.5v-6.3h18.7V30H110v6.3h12.5v6.2h6.3v6.3h6.2V55h6.3v12.5h6.2V80h6.3c0 20-8.3 30-11.3 44-3.8 17-20.5 17.7-20.5 5.6l.5-37zm-18.8-50v-6.3h-6.2V30h-6.3v6.3H85v6.2h6.3v6.3h12.5zm-12.5-3V36h6.3v6.3h-6.3zM285 155v-6.3h6.3v-12.4H310v6.2h43.8v-6.3H366V130h6.3v12.5H366v6.3h-6v6.2h-18.8v6.3H285z" />
        <path id="clawLegsStep1" fill="#d45720" d="M222.5 183v-9h-6.3v-12.6h-18.7v6.3h-6.3v6.3h-12.4v6.2h-6.3v6.3h-6.3v-18.8h6.3v-6.3h6.3V130h18.7v6.3h6.3v6.2h18.7v6.3H235v12.4h6.3V155h6.2v-6.3h25v18.8h6.3V180h-6.3v6.3h-6.3v-12.6H260v-6.2h-25v18.8h-6.3v6.2h-6.2zM85 177v-3.2h6.3v-12.6h6.2v-25h-6.3v6.3H78.8v6.3H66.3v6.2h-25v-6.3H35V130h6.3v-6.3h6.2v-6.2h6.3v-6.3h12.5V105H85v6.3h6.3v6.2h6.2v6.3h6.3v6.2h25v-6.3h12.4v-6.2h25v18.8H160v6.2h-6.3v6.3h-6.2v6.2H135v6.3h-6.3v6.2h-12.4v6.3h-12.5v6.2H85zm-37.5-31.4v-3h-6.3v6.2h6.3z" />
        <path id="clawLegsStep2" opacity="0" fill="#d45720" d="M241.3 183v-3h-12.6v-12.5h-12.4v-6.3h-25v6.3H185v6.3h-12.5v6.2h-18.8v-6.3h6.3v-6.2h6.3v-6.3h6.2v-18.7h6.3V130h18.7v6.3h6.3v6.2h18.7v6.3H235v12.4h6.3V155h6.2v-6.3h25v12.6h6.3v6.2h6.2V180h-6.3v-6.3h-12.4v-6.2h-25v6.3h6.2v12.4h-6.3zm-143.8-6v-3.3h6.3v-25h-25v6.3H66.3v6.3H47.5V155h6.3v-6.3H41.3v6.3H35v-18.8h6.3V130h6.2v-6.3h6.3c9.8 0 18-1.6 31.4 6 5.7-.2 35.6.2 43.5.3v-6.3h12.6c13.5 6 12.8 9.5 18.7 18.8h-6.3v6.3h-6.2v6.2h-6.3v6.3H135v6.2h-6.3v6.3h-12.4v6.2H97.5zM60 145.5v-3h-6.3v6.2H60z" />
        <path id="shellShadow" fill="#785447" d="M141.3 108v-3h6.2V80h6.3v31.3h-6.3v6.4H141z" />
        <path id="clawLegsDarkStep1" fill="#9a4017" d="M235 164.4v-3.2h6.3V155h6.2v-6.3h6.3v18.8H235zm-37.5-15.7v-12.4h6.3v6.2h12.4V155H210v6.3h-12.5zM41.2 152v-3.2h6.3v-12.6h6.3V130H60v-12.5h-6.3v-6.3h12.5V105H85v6.3h6.3v6.2h6.2v6.3h6.3v6.2h12.5v6.3h-25v6.2H78.8v6.3H66.3v6.2h-25zm112.5-12.6v-3.2h-12.4v-18.6h25v18.7H160v6.2h-6.3z" />
        <path id="clawLegsDarkStep2" opacity="0" fill="#9a4017" d="M241.2 161.2V155h6.3v-6.3h6.2v18.8h-12.5zm-193.7-3V155h6.2v-6.3H60v-25h-6.3v-6.2h12.5v-6.3h12.5V105h12.5v12.5h6.3v6.2h6.2v6.3h12.5v6.2H110v6.3H97.5v6.2H78.7v6.3H66.2v6.2H47.5zm150-9.5v-12.5h6.2v6.3h12.5v18.7h-18.7zm-43.8-9.3v-3.2h-12.5v-18.7h25v18.7H160v6.3h-6.3z" />
        <path id="eyeNose" fill="#3f6533" d="M60 70.6v-3h-6.3v-6.3H60v6.2h31.3v6.3H60v-3.2zM41.2 58v-3h6.3v6.3h-6.3V58zM28.8 45.7v-3H35v6h-6.3v-3zm62.5-6.2v-3.2h6.3v6.3h-6.3v-3z" />
      </WalkingCrabigator>
    </SvgWrapper>
  </LayoutWrapper>
);

export default LoadingCrabigator;
