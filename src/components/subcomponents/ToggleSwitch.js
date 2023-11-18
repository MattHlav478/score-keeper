import React from "react";
import "./ToggleSwitch.css";

export default function ToggleSwitch({ isToggled, onToggle }) {
  return (
    <label className="switch">
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="slider" />
    </label>
  );
}
