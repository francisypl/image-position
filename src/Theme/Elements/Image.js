import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useRef
} from "react";
import { merge } from "lodash";
import cx from "classnames";

import { StyledImage as Image } from "./Styled";
import * as containerStyles from "../../constants/containerStyles";
import ImageToolbar from "../../Editor/ImageEditor/Toolbar";
import Align from "../../Editor/Align";
import Layer from "../../Editor/Layer";
import AppStoreContext, {
  setAboutProperty
} from "../../common/AppStoreContext";
import { Slider } from "./Slider";

const DEFAULT_POSITION = {
  top: 0,
  left: 0
};

const DEFAULT_SCALE = 1;

const EDIT_STATES = {
  view: "view",
  move: "move"
};

function getPosition(e) {
  return { x: e.clientX, y: e.clientY };
}

function getHorizontalImgStyles() {
  const defaults = getDefaultImgStyles(...arguments);
  return merge(defaults, {
    crop: {
      width: "100%",
      paddingTop: "56.25%"
    }
  });
}

function getVerticalImgStyles() {
  const defaults = getDefaultImgStyles(...arguments);
  return merge(defaults, {
    crop: {
      width: "100%",
      paddingTop: "150%"
    }
  });
}

function getSquareImgStyles() {
  const defaults = getDefaultImgStyles(...arguments);
  return merge(defaults, {
    crop: {
      width: "100%",
      paddingTop: "100%"
    }
  });
}

function getDefaultImgStyles(
  { width, height } = {},
  { left, top } = {},
  scale
) {
  return {
    container: {
      width,
      height,
      transform: `translate(${left}px, ${top}px) scale(${scale}, ${scale})`
    }
  };
}

function getStyles(containerStyle, ...args) {
  switch (containerStyle) {
    case containerStyles.horizontal:
      return getHorizontalImgStyles(...args);
    case containerStyles.vertical:
      return getVerticalImgStyles(...args);
    case containerStyles.square:
      return getSquareImgStyles(...args);
    default:
      return getDefaultImgStyles(...args);
  }
}

export function ImageContainer({
  id,
  containerStyle,
  style,
  scale,
  pos,
  ...props
}) {
  const [img, setImg] = useState();
  const [showEditOption, setShowEditOption] = useState(false);
  const [imgScale, setScale] = useState(scale || DEFAULT_SCALE);
  const [editState, setEditState] = useState(EDIT_STATES.view);
  const [ref, setRef] = useState();
  const [position, setPosition] = useState(pos || DEFAULT_POSITION);
  const [containerDimension, setContainerDimension] = useState();

  const { state, dispatch } = useContext(AppStoreContext);
  const setCard = setAboutProperty(state, dispatch);
  const initPos = useRef();
  const isViewState = editState === EDIT_STATES.view;
  const isMoveState = editState === EDIT_STATES.move;

  const saveRef = useCallback(ref => {
    setRef(ref);
  }, []);

  const exitMove = useCallback(() => {
    setEditState(EDIT_STATES.view);
    setPosition(pos || DEFAULT_POSITION);
    setScale(scale || DEFAULT_SCALE);
  }, [pos, scale]);

  function saveMove() {
    setEditState(EDIT_STATES.view);
    setCard({ id, pos: position, scale: imgScale });
  }

  const handleMouseMove = useCallback(
    e => {
      const mousePosition = getPosition(e);
      if (mousePosition && initPos.current) {
        const delta = {
          x: initPos.current.x - mousePosition.x,
          y: initPos.current.y - mousePosition.y
        };
        console.log("img", imgScale);
        const maxWidth = img.width - containerDimension.width * imgScale;
        const maxHeight = img.height - containerDimension.height * imgScale;
        const top = Math.min(
          Math.max(maxHeight * -1, position.top - delta.y),
          0
        );
        const left = Math.min(
          Math.max(maxWidth * -1, position.left - delta.x),
          0
        );
        setPosition({ top, left });
      }
    },
    [initPos, img, containerDimension, imgScale, position]
  );

  const handleScale = useCallback(newScale => {
    setScale(1 + newScale);
  }, []);

  const showToolbar = showEditOption;
  const imageToolbar = showToolbar ? (
    <Layer>
      <Align node={ref} offset={{ top: 47, left: -10 }}>
        <ImageToolbar
          items={
            isViewState
              ? ["move", "container"]
              : isMoveState
              ? ["save", "exit"]
              : []
          }
          onContainerChange={newStyle =>
            setCard({ id, containerStyle: newStyle })
          }
          onMoveClick={() => setEditState(EDIT_STATES.move)}
          onSave={saveMove}
          onExit={exitMove}
        />
      </Align>
    </Layer>
  ) : null;

  // get the original image's dimensions
  useEffect(() => {
    const image = new window.Image();
    image.onload = function() {
      setImg({ width: image.width, height: image.height });
    };
    image.src = props.src;
  }, [props.src]);

  // get the container's dimensions
  useEffect(() => {
    if (ref) {
      setContainerDimension(ref.getBoundingClientRect());
    }
  }, [containerStyle, ref]);

  useEffect(() => {
    setPosition(pos || DEFAULT_POSITION);
  }, [pos]);

  const styles = getStyles(containerStyle, img, position, imgScale);

  return (
    <>
      <div
        className={cx("crop-img-container", {
          move: isMoveState
        })}
        ref={saveRef}
        style={styles.crop}
        onMouseOver={() => setShowEditOption(true)}
        onMouseLeave={() => setShowEditOption(false)}
        onMouseDown={e => {
          if (isMoveState && e.target.tagName === "IMG") {
            ref.addEventListener("mousemove", handleMouseMove);
            initPos.current = getPosition(e);
          }
        }}
        onMouseUp={() => {
          if (isMoveState) {
            ref.removeEventListener("mousemove", handleMouseMove);
            initPos.current = null;
          }
        }}
      >
        {imageToolbar}
        <div style={styles.container} className="full-img-container">
          <Image style={{ visible: !!img }} {...props} />
        </div>
        {isMoveState && (
          <Slider defaultValue={scale - DEFAULT_SCALE} onChange={handleScale} />
        )}
      </div>
    </>
  );
}

export { Image };
