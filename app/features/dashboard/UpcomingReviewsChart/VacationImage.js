import React from "react";
import cuid from "cuid";

import Element from "common/components/Element";

import { SVGWrapper, SVG } from "common/components/Icon/styles";
const crab = {
  viewBox: "0 0 144.1 144",
  paths: [
    "M121 42l2.3-11.6-2.4.7c-1 .2-10.7 3-13.7 6-6.5 6.4-3.5 20.4-3.4 21-1 2-3.7 6.2-9.5 6.5-4.2-4-10-6.5-16.2-6.5H66a23 23 0 0 0-16 6.5 11 11 0 0 1-9.7-6.1V58c.2-.6 3.2-14.6-3.3-21-3-3-12.7-5.7-13.8-6l-2.3-.7L23.1 42l-11.6-2.7.6 2.4c.3 1.1 2.9 11 6 14.1 2.8 2.8 7.2 4.2 13.2 4.2a42 42 0 0 0 6.1-.4c1.4 2.9 4.6 6.7 10 7.8a23.2 23.2 0 0 0-3.7 20.8L35 96.8v7h3V98l6.8-6.8c1.4 3 3.3 5.5 5.7 7.6l-7.8 7.9v6.9h3v-5.7l7.2-7.2c3.7 2.5 8.2 4 13 4h12.2a23 23 0 0 0 13-4l7.3 7.2v5.7h3v-7l-7.9-7.8c2.4-2 4.4-4.7 5.7-7.6l6.9 6.8v5.7h3v-7l-8.7-8.5a23.2 23.2 0 0 0-3.7-20.9c5.2-1 8.4-4.9 9.8-7.8 1.4.3 3.7.5 6.3.5 6 0 10.4-1.4 13.2-4.2 3-3 5.7-13 6-14.1l.6-2.4L121 42zM37.5 56.5c-1.2.2-3.6.5-6.2.5-3.6 0-8.4-.5-11.1-3.3a32.7 32.7 0 0 1-4.5-10.3L27 46l-2.3-11.4c3.4 1.1 8.4 3 10 4.6 4.5 4.4 3.3 14.2 2.8 17.3zm61 24.9c0 11.2-9.2 20.3-20.4 20.3H66A20.3 20.3 0 0 1 66 61h12.2c11.2 0 20.3 9.1 20.3 20.3zm25.4-27.7c-2.8 2.8-7.6 3.3-11.1 3.3-2.6 0-5-.3-6.3-.5-.5-3.1-1.6-12.9 2.8-17.3a33 33 0 0 1 10-4.6L117.2 46l11.3-2.6a30 30 0 0 1-4.5 10.3z",
    "M60 56.7a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm0-11a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm24 11a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm0-11a4 4 0 1 1 0 8 4 4 0 0 1 0-8z",
  ],
};
const cocktail = {
  viewBox: "0 0 144.1 144",
  paths: [
    "M103 39.3c-.4-.4-.8-.7-1.3-.7H72A15.6 15.6 0 1 0 61.5 55l16.1 36.3v25.2H64.3v3H94v-3H80.6V91.3l15.2-34.2h.2v-.4l7-16c.2-.4.2-1 0-1.4zM56.4 52.8A12.6 12.6 0 1 1 69 38.6H56.6a1.5 1.5 0 0 0-1.4 2.1l5.1 11.5a12 12 0 0 1-3.8.6zM79 87.3L64.7 54.7c1 .2 1.6.6 2.4 1 1.5.6 3.1 1.4 6.3 1.4 3.1 0 4.8-.8 6.3-1.5a9.8 9.8 0 0 1 5-1.2c2.4 0 3.6.6 5 1.2.8.4 1.7.9 3 1.2L79 87.3zM94 54c-1.2-.2-2-.6-3-1-1.4-.8-3-1.6-6.2-1.6s-4.9.8-6.3 1.5c-1.4.7-2.5 1.2-5 1.2s-3.7-.5-5-1.2c-1.3-.6-2.7-1.3-5.1-1.4L59 41.6h40.5L93.9 54z",
  ],
};

function VacationImage() {
  return (
    <Element flexRow flexCenter>
      <SVGWrapper inline={false} color="black" size="5rem">
        <SVG
          title="On Vacation"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          viewBox={crab.viewBox}
        >
          {crab.paths.map((path) => <path key={cuid()} d={path} />)}
        </SVG>
      </SVGWrapper>
      <SVGWrapper inline={false} color="black" size="4.2rem">
        <SVG
          title="On Vacation"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          viewBox={cocktail.viewBox}
        >
          {cocktail.paths.map((path) => <path key={cuid()} d={path} />)}
        </SVG>
      </SVGWrapper>
    </Element>
  );
}

export default VacationImage;
