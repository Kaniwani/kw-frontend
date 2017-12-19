import React from 'react';
import Toggle from "components/Toggle";

export default {
  component: Toggle,
  props: {
    defaultOn: true,
    render: ({ on, getTogglerProps }) => (
      <div>
        <p>{`Toggle uses render prop that supplies { on: ${on}, toggle: fn(), getTogglerProps: fn() }`}</p>
        <button type="button" {...getTogglerProps()}>
          toggle
        </button>
        <h1>{on ? 'on' : 'off'}</h1>
      </div>
    ),
  },
};
