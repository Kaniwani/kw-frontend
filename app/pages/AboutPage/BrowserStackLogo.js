import React from 'react';
import A from 'common/components/A';
import browserStackImg from "common/assets/img/browserstack.svg";

const BrowserStackLogo = () => (
  <A plainLink href="https://www.browserstack.com/" external>
    <img
      style={{ width: "100%", height: "100%" }}
      alt="BrowserStack Logo"
      src={browserStackImg}
    />
  </A>
);

export default BrowserStackLogo;
