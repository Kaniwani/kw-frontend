import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Video = styled.video`
  position: fixed;
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
`;

const Overlay = styled.header`
  position: relative;
  height: 100vh;
  text-align: center;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-end;
  padding: 0 0.5rem 5vh;
  color: #efefef;
  text-shadow: 0 1px 0.2em rgba(0, 0, 0, 0.25);
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 0.8)
  );
`;

const HeaderText = styled.h1``;
const SubHeaderText = styled.h3`
  font-weight: 400;
  padding-top: 5px;
`;

VideoBanner.propTypes = {
  sources: PropTypes.shape({
    jpg: PropTypes.string.isRequired,
    mp4: PropTypes.string.isRequired,
    webm: PropTypes.string.isRequired,
  }).isRequired,
  headerText: PropTypes.string,
  subHeaderText: PropTypes.string,
};

VideoBanner.defaultProps = {
  headerText: '',
  subHeaderText: '',
};

function VideoBanner({ sources, headerText, subHeaderText }) {
  return (
    <div>
      <Video autoPlay playsInline muted loop poster={sources.img}>
        <source src={sources.webm} type="video/webm" />
        <source src={sources.mp4} type="video/mp4" />
      </Video>
      {headerText && (
        <Overlay>
          <HeaderText>{headerText}</HeaderText>
          <SubHeaderText>{subHeaderText}</SubHeaderText>
        </Overlay>
      )}
    </div>
  );
}

export default VideoBanner;
