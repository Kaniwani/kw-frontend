import React from 'react';

const IgnoreButton = () => (
  <button id="ignoreAnswer" type="button" className="submit -ignore -hidden">
    { /* wrap because <button> can't display:flex in safari properly */ }
    <span className="submitwrap">
            <span className="icon i-cancel" />
          </span>
  </button>
);

export default IgnoreButton;