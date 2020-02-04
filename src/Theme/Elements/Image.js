import React, { useState, useCallback } from "react";

import { StyledImage as Image } from "./Styled";
import * as containerStyles from "../../constants/containerStyles";
import ImageToolbar from "../../Editor/ImageEditor/Toolbar";
import Align from "../../Editor/Align";
import Layer from "../../Editor/Layer";

function getHorizontalImgStyles() {
  return {};
}

function getVerticalImgStyles() {
  return {};
}

function getSquareImgStyles() {
  return {};
}

function getDefaultImgStyles() {
  return {};
}

function getStyles(containerStyle) {
  switch (containerStyle) {
    case containerStyles.horizontal:
      return getHorizontalImgStyles(...arguments);
    case containerStyles.vertical:
      return getVerticalImgStyles(...arguments);
    case containerStyles.square:
      return getSquareImgStyles(...arguments);
    default:
      return getDefaultImgStyles(...arguments);
  }
}

export function ImageContainer({ containerStyle, style, ...props }) {
  const [img, setImg] = useState();
  const [showEditOption, setShowEditOption] = useState(true);
  const styleFn = getStyles(containerStyle);
  const styles = {
    ...style,
    visible: !!img
  };
  const [ref, setRef] = useState();

  const saveRef = useCallback(ref => {
    setRef(ref);
  }, []);

  const showToolbar = showEditOption;
  const imageToolbar = showToolbar ? (
    <Layer>
      <Align node={ref} offset={{ top: 47, left: -10 }}>
        <ImageToolbar items={["container"]} />
      </Align>
    </Layer>
  ) : null;

  return (
    <div
      ref={saveRef}
      // onMouseOver={() => setShowEditOption(true)}
      // onMouseLeave={() => setShowEditOption(false)}
    >
      {imageToolbar}
      <Image style={styles} onLoad={e => setImg(e.target)} {...props} />;
    </div>
  );
}

export { Image };
