import { useState } from "react";
import ReactSlider from "react-slider";
import "./ReactSlider.css";

const MIN = 100;
const MAX = 12000;

const ReactSlider1 = () => {
  return (
    <div>
      <h1 className="col">Hello</h1>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        defaultValue={[0, 100]}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        pearling
        minDistance={10}
      />
    </div>
  );
};

export default ReactSlider1;
