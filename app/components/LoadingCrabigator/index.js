import React from 'react';
import styled, { keyframes } from 'styled-components';
import { transparent } from 'shared/styles/colors';

const fadeOut = keyframes`
  50% { opacity: 0; }
`;
const fadeIn = keyframes`
  50% { opacity: 1; }
`;

const LayoutWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex: 1 0 100%;
  justify-content: center;
  align-items: center;
`;

const SvgWrapper = styled.div`
  position: relative;
  width: 20vmin;
  height: 10vmin;
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
        <rect id="eyeBg" x="84" y="30" width="20px" height="19px" fill="#fff" />
        <rect id="neckBg" x="79" y="92" width="44px" height="38px" fill="#d0efdb" />
        <path id="pinkClawStep1" fill="#f36353" d="M222.5 183.12v-9.37h-6.25v-12.5H197.5v6.25h-6.25v6.25h-12.5V180h-6.25v6.25h-6.25V167.5h6.25v-6.25H160V155h-25v6.25h-6.25v6.25h-12.5v6.25h-12.5V180H85v-6.25H72.5v-12.5h6.25V155H85v-6.25h6.25v-6.25h-12.5v6.25h-12.5V155h-25v-6.25H35V130h6.25v-6.25h6.25v-6.25h6.25v-6.25h12.5V105H85v6.25h6.25v6.25h6.25v6.25h6.25V130h18.75V92.5h-6.25v6.25h-37.5V92.5H72.5v-6.25H60V80h-6.25v-6.25h-12.5V67.5H35v-6.25h-6.25V55H22.5V42.5h6.25v-6.25H47.5v6.25h6.25v-6.25h12.5V30h12.5v-6.25H97.5V30H110v6.25h12.5v6.25h6.25v6.25H135V55h6.25v12.5h6.25V80H160v-6.25h25V67.5h50v6.25h18.75V80h12.5v6.25h6.25v6.25h6.25v6.25H285v12.5h6.25v12.5h6.25v12.5H310v6.25h43.75v-6.25h12.5V130h6.25v12.5h-6.25v6.25H360V155h-18.75v6.25H272.5v6.25h6.25V180h-6.25v6.25h-6.25v-12.5H260v-6.25h-25v18.75h-6.25v6.25h-6.25v-9.38zm-131.25-12.5v-3.12H85v6.25h6.25v-3.13zm-43.75-25v-3.12h-6.25v6.25h6.25v-3.13zm50-6.25v-3.12h-6.25v6.25h6.25v-3.13zm6.25-96.87v-6.25H97.5V30h-6.25v6.25H85v6.25h6.25v6.25h12.5V42.5zm-12.5-3.13v-3.12h6.25v6.25h-6.25v-3.13z" />
        <path id="pinkClawStep2" opacity="0" d="M103.75 167.5h-12.5v6.25h-12.5v-12.5H85V155h6.25c0-7.286-.076-16.863-.076-16.863l12.966.675z" fill="#f36353" />
        <path id="shell" d="M228.75 167.5h-12.5v-6.25h-25c-9.06.021-12.288-.071-25 0H160V155h-12.883c.285-45.725.922-48.983.383-75H160v-6.25h25V67.5h50v6.25h18.75V80h12.5v6.25h6.25v6.25h6.25v6.25H285v12.5h6.25v12.5h6.25s-.426 5.22 0 12.5c1.606 27.452 4.465 22.973-18.75 25-8.497.742-12.5 20.64-12.5 6.25h-25z" fill="#ba8a59" />
        <path id="headTail" d="M122.5 92.5h-6.25v6.25h-37.5V92.5H72.5v-6.25H60V80h-6.25v-6.25h-12.5V67.5H35v-6.25h-6.25V55H22.5V42.5h6.25v-6.25H47.5v6.25h6.25v-6.25h12.5V30h12.5v-6.25H97.5V30H110v6.25h12.5v6.25h6.25v6.25H135V55h6.25v12.5h6.25V80h6.25c0 20.096-8.22 29.973-11.286 43.877-3.744 16.982-20.436 17.85-20.436 5.752 0-4.147.472-32.633.472-37.129zm-18.75-50v-6.25H97.5V30h-6.25v6.25H85v6.25h6.25v6.25h12.5zm-12.5-3.13v-3.12h6.25v6.25h-6.25zM285 155v-6.25h6.25v-12.5H310v6.25h43.75v-6.25h12.5V130h6.25v12.5h-6.25v6.25H360V155h-18.75v6.25H285z" fill="#8ac249" />
        <path id="clawLegsStep1" fill="#d45720" d="M222.5 183.12v-9.37h-6.25v-12.5H197.5v6.25h-6.25v6.25h-12.5V180h-6.25v6.25h-6.25V167.5h6.25v-6.25h6.25V130h18.75v6.25h6.25v6.25h18.75v6.25H235v12.5h6.25V155h6.25v-6.25h25v18.75h6.25V180h-6.25v6.25h-6.25v-12.5H260v-6.25h-25v18.75h-6.25v6.25h-6.25v-9.38zM85 176.87v-3.12h6.25v-12.5h6.25v-25h-6.25v6.25h-12.5v6.25h-12.5V155h-25v-6.25H35V130h6.25v-6.25h6.25v-6.25h6.25v-6.25h12.5V105H85v6.25h6.25v6.25h6.25v6.25h6.25V130h25v-6.25h12.5v-6.25h25v18.75H160v6.25h-6.25v6.25h-6.25V155H135v6.25h-6.25v6.25h-12.5v6.25h-12.5V180H85v-3.13zm-37.5-31.25v-3.12h-6.25v6.25h6.25v-3.13zm93.75-37.5V105h6.25V80h6.25v31.25h-12.5v-3.13zM60 70.62V67.5h-6.25v-6.25H60v6.25h31.25v6.25H60v-3.13zm-18.75-12.5V55h6.25v6.25h-6.25v-3.13zm-12.5-12.5V42.5H35v6.25h-6.25v-3.13zm62.5-6.25v-3.12h6.25v6.25h-6.25v-3.13z" />
        <path id="clawLegsStep2" opacity="0" d="M241.25 183.13V180h-12.5v-12.5h-12.5v-6.25h-25v6.25H185v6.25h-12.5V180h-18.75v-6.25H160v-6.25h6.25v-6.25h6.25V142.5h6.25V130h18.75v6.25h6.25v6.25h18.75v6.25H235v12.5h6.25V155h6.25v-6.25h25v12.5h6.25v6.25H285V180h-6.25v-6.25h-12.5v-6.25h-25v6.25h6.25v12.5h-6.25zM97.5 176.88v-3.13h6.25v-25h-25V155h-12.5v6.25H47.5V155h6.25v-6.25h-12.5V155H35v-18.75h6.25V130h6.25v-6.25h6.25c9.864 0 17.978-1.674 31.41 6.081 5.768-.333 35.667.114 43.59.169v-6.25h12.5c13.547 6.035 12.847 9.415 18.75 18.75h-6.25v6.25h-6.25V155h-6.25v6.25H135v6.25h-6.25v6.25h-12.5V180H97.5zM60 145.63v-3.13h-6.25v6.25H60z" fill="#d45720" />
        <path id="shellShadow" d="M141.25 108.1V105h6.25V80h6.25v31.26h-6.25l-.06 6.4-6.2-.06z" fill="#785447" />
        <path id="clawLegsDarkStep1" fill="#9a4017" d="M235 164.37v-3.12h6.25V155h6.25v-6.25h6.25v18.75H235zm-37.5-15.62v-12.5h6.25v6.25h12.5V155H210v6.25h-12.5zm-156.25 3.12v-3.12h6.25v-12.5h6.25V130H60v-12.5h-6.25v-6.25h12.5V105H85v6.25h6.25v6.25h6.25v6.25h6.25V130h12.5v6.25h-25v6.25h-12.5v6.25h-12.5V155h-25zm112.5-12.5v-3.12h-12.5v-18.7l6.25-.05h18.75v18.75H160v6.25h-6.25zM60 70.62V67.5h-6.25v-6.25H60v6.25h31.25v6.25H60zm-18.75-12.5V55h6.25v6.25h-6.25zm-12.5-12.5V42.5H35v6.25h-6.25zm62.5-6.25v-3.12h6.25v6.25h-6.25z" />
        <path id="clawLegsDarkStep2" opacity="0" d="M241.23 161.24V155h6.25v-6.26h6.26v18.75h-12.5zm-193.75-3.12V155h6.26v-6.26H60v-25h-6.26v-6.25h12.5v-6.28h12.5V105h12.5v12.5h6.25v6.23h6.24V130h12.5v6.24H110v6.25H97.5v6.22H78.74V155h-12.5v6.24H47.48zm150-9.38v-12.5h6.26v6.25h12.5v18.72H197.5zm-43.75-9.37v-3.13h-12.5v-12.5l.02-6.2 6.23-.06h18.75v18.74H160v6.25h-6.25z" fill="#9a4017" />
        <path id="eyeNose" d="M60 70.63V67.5h-6.25v-6.25H60v6.25h31.25v6.25H60v-3.13zm-18.75-12.5V55h6.25v6.25h-6.25v-3.13zm-12.5-12.5V42.5H35v6.25h-6.25v-3.13zm62.5-6.26v-3.12h6.25v6.25h-6.25v-3.13z" fill="#3f6533" />
        <path id="mouth" d="M28.75 45.63V42.5H35v6.25h-6.25v-3.13zm62.5-6.26v-3.12h6.25v6.25h-6.25v-3.13z" fill="#2f3e45" />
      </WalkingCrabigator>
    </SvgWrapper>
  </LayoutWrapper>
);

export default LoadingCrabigator;
