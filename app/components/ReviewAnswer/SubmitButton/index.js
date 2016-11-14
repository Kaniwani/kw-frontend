import React from 'react';

const SubmitButton = () => (
  <button id="submitAnswer" type="submit" className="submit -answer">
    { /* wrap because <button> can't display:flex in safari properly */ }
    <span className="submitwrap">
            <span className="icon i-rightarrow" />
          </span>
  </button>
);

export default SubmitButton;