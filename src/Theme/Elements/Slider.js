import React, { useState, useRef, useEffect, useCallback } from "react";
import cx from "classnames";

import { Icon } from "./Icon";

const INIT_POS = 25;
const END_POS = 138;

export function Slider({ min, max, defaultValue, onChange }) {
  const [handleRef, setHandleRef] = useState();
  const [isDragging, setIsDragging] = useState(false);
  const [initPix, setInitPix] = useState();
  const [position, setPosition] = useState(INIT_POS);
  const handleDrag = useRef();

  useEffect(() => {
    handleDrag.current = function(e) {
      const delta = e.x - initPix;
      setPosition(Math.min(Math.max(INIT_POS, delta + INIT_POS), END_POS));
      onChange();
    };
  }, [initPix]);

  function handleMouseUp() {
    setIsDragging(false);
    window.removeEventListener("mousemove", handleDrag.current);
  }

  const saveRef = useCallback(ref => {
    if (ref) {
      setInitPix(ref.getBoundingClientRect().left);
      setHandleRef(ref);
    }
  }, []);

  return (
    <div className="slider-container" onMouseUp={handleMouseUp}>
      <Icon className="slider-zoom-in" name="zoomIn" />
      <Icon className="slider-zoom-out" name="zoomOut" />
      <div
        ref={saveRef}
        className={cx("slider-handle", { active: isDragging })}
        style={{
          left: `${position}px`
        }}
        onMouseDown={e => {
          e.stopPropagation();
          setIsDragging(true);
          window.addEventListener("mousemove", handleDrag.current);
        }}
        onMouseUp={handleMouseUp}
      />
      <div className="slider-bar" />
    </div>
  );
}
