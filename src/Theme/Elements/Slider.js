import React, { useState, useRef, useCallback } from "react";
import cx from "classnames";

import { Icon } from "./Icon";

const INIT_POS = 25;
const END_POS = 138;
const STEP = (END_POS - INIT_POS) / 10;

function normalize(value) {
  return (value - INIT_POS) / (END_POS - INIT_POS);
}

function getPositionFromValue(value) {
  return value * END_POS + INIT_POS;
}

export function Slider({ defaultValue, onChange }) {
  const [handleRef, setHandleRef] = useState();
  const [isDragging, setIsDragging] = useState(false);
  const initPix = useRef();
  const [position, setPosition] = useState(
    getPositionFromValue(defaultValue) || INIT_POS
  );

  function incrementPosition(delta) {
    const newPos = Math.min(Math.max(INIT_POS, delta + position), END_POS);
    setPosition(newPos);
    onChange(normalize(newPos));
  }

  const handleDrag = useCallback(
    e => {
      incrementPosition(e.x - initPix.current);
    },
    [onChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    window.removeEventListener("mousemove", handleDrag);
    window.removeEventListener("mouseup", handleMouseUp);
  }, [handleDrag]);

  const saveRef = useCallback(ref => {
    if (ref) {
      initPix.current = ref.getBoundingClientRect().left;
      setHandleRef(ref);
    }
  }, []);

  return (
    <div className="slider-container">
      <Icon
        className="slider-zoom-in"
        name="zoomIn"
        onClick={() => incrementPosition(STEP)}
      />
      <Icon
        className="slider-zoom-out"
        name="zoomOut"
        onClick={() => incrementPosition(STEP * -1)}
      />
      <div
        ref={saveRef}
        className={cx("slider-handle", { active: isDragging })}
        style={{
          left: `${position}px`
        }}
        onMouseDown={e => {
          e.stopPropagation();
          setIsDragging(true);
          window.addEventListener("mousemove", handleDrag);
          window.addEventListener("mouseup", handleMouseUp);
        }}
      />
      <div className="slider-bar" />
    </div>
  );
}
