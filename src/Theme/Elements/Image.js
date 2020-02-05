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

const DEFAULT_POSITION = {
  top: 0,
  left: 0
};

const EDIT_STATES = {
  view: "view",
  move: "move"
};

function getPosition(e) {
  return { x: e.clientX, y: e.clientY };
}

function getHorizontalImgStyles() {
  return {};
}

function getVerticalImgStyles() {
  return {};
}

function getSquareImgStyles({ width, height } = {}, position = {}) {
  const defaults = getDefaultImgStyles(...arguments);
  const CONTAINER_LEN = 250;
  const MAX_WIDTH = width - CONTAINER_LEN;
  const MAX_HEIGHT = height - CONTAINER_LEN;
  const top = Math.min(Math.max(MAX_HEIGHT * -1, position.top), 0);
  const left = Math.min(Math.max(MAX_WIDTH * -1, position.left), 0);
  return merge(defaults, {
    crop: {
      width: CONTAINER_LEN,
      height: CONTAINER_LEN
    },
    container: {
      transform: `translate(${Math.min(0, left)}px, ${Math.min(0, top)}px)`
    }
  });
}

function getDefaultImgStyles({ width, height } = {}) {
  return {
    container: {
      width,
      height
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

export function ImageContainer({ id, containerStyle, style, pos, ...props }) {
  const [img, setImg] = useState();
  const [showEditOption, setShowEditOption] = useState(false);
  const [editState, setEditState] = useState(EDIT_STATES.view);
  const [ref, setRef] = useState();
  const [position, setPosition] = useState(pos || DEFAULT_POSITION);
  const { state, dispatch } = useContext(AppStoreContext);
  const setContainerStyle = setAboutProperty(state, dispatch);
  const initPos = useRef();

  const saveRef = useCallback(ref => {
    setRef(ref);
  }, []);

  const showToolbar = showEditOption;
  const imageToolbar = showToolbar ? (
    <Layer>
      <Align node={ref} offset={{ top: 47, left: -10 }}>
        {editState === EDIT_STATES.view && (
          <ImageToolbar
            items={["container", "move"]}
            onContainerChange={newStyle =>
              setContainerStyle({ id, containerStyle: newStyle })
            }
            onMoveClick={() => setEditState(EDIT_STATES.move)}
          />
        )}
        {editState === EDIT_STATES.move && (
          <ImageToolbar items={["save", "exit"]} />
        )}
      </Align>
    </Layer>
  ) : null;

  useEffect(() => {
    const image = new window.Image();
    image.onload = function() {
      setImg({ width: image.width, height: image.height });
    };
    image.src = props.src;
  }, [props.src]);

  function handleMouseMove(e) {
    const mousePosition = getPosition(e);
    if (mousePosition && initPos.current) {
      const delta = {
        x: initPos.current.x - mousePosition.x,
        y: initPos.current.y - mousePosition.y
      };
      setPosition({
        top: position.top - delta.y,
        left: position.left - delta.x
      });
    }
  }

  const styles = getStyles(containerStyle, img, position);

  return (
    <div
      className={cx("crop-img-container", {
        move: editState === EDIT_STATES.move
      })}
      ref={saveRef}
      style={styles.crop}
      onMouseOver={() => setShowEditOption(true)}
      onMouseLeave={() => setShowEditOption(false)}
      onMouseDown={e => {
        ref.addEventListener("mousemove", handleMouseMove);
        initPos.current = getPosition(e);
      }}
      onMouseUp={() => {
        ref.removeEventListener("mousemove", handleMouseMove);
        initPos.current = null;
      }}
    >
      {imageToolbar}
      <div style={styles.container} className="full-img-container">
        <Image style={{ visible: !!img }} {...props} />
      </div>
    </div>
  );
}

export { Image };
