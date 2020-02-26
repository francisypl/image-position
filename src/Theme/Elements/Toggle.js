import React from "react";

export function Toggle({ onChange, value }) {
  const checked = Boolean(value);
  return (
    <label className="ux-toggle">
      <input
        type="checkbox"
        class="ux-toggle-checkbox"
        checked={value}
        onClick={() => {
          onChange(!checked);
        }}
      />
      <span className="ux-toggle-bg" />
      <span className="ux-toggle-handle" />
    </label>
  );
}
