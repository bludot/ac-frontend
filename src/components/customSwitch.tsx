import React, { Component, useState } from "react";
import Switch from "react-switch";

function CustomSwitch() {
  const [checked, setChecked] = useState(false);

  function handleChange(val: boolean) {
    setChecked(val);
  }


  return (
    <div className="example">
      <h2>Custom styling</h2>
      <label htmlFor="material-switch">
        <span>Swing</span>
        <Switch
          checked={checked}
          onChange={handleChange}
          onColor="#86d3ff"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 3px rgba(0, 0, 0, 0.6)"
          height={20}
          width={48}
          className="react-switch"
          id="material-switch"
        />
      </label>
    </div>
  );
}
export default CustomSwitch;
