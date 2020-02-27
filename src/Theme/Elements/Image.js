import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext
} from "react";
import { merge } from "lodash";
import cx from "classnames";

import { StyledImage as Image } from "./Styled";
import * as containerStyles from "../../constants/containerStyles";
import ImageToolbar from "../../Editor/ImageEditor/Toolbar";
import Align from "../../Editor/Align";
import Layer from "../../Editor/Layer";
import { Slider } from "./Slider";
import { Text } from "./Text";
import { Flex } from "./Flex";
import AppStoreContext, {
  SET_MODAL_ACTION
} from "../../common/AppStoreContext";
import RouteStoreContext, {
  setRouteState,
  setRoute
} from "../../common/RouteStoreContext";
import ImagePicker from "../../Editor/ImagePicker";
import * as routes from "../../constants/routes";

const DEFAULT_POSITION = {
  top: 0,
  left: 0
};

const DEFAULT_SCALE = 1;

const DEFAULT_ROTATION = 0;

const EDIT_STATES = {
  view: "view",
  move: "move",
  moving: "moving"
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
  scale,
  rotation
) {
  return {
    container: {
      width,
      height,
      transform: `translate(${left}px, ${top}px) scale(${scale}, ${scale}) rotate(${rotation}deg)`
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

export function ImageContainer({ caption, ...props }) {
  return (
    <Flex flexDirection="column">
      <InnerImage {...props} />
      {caption && (
        <Text className="img-caption" fontSize={1}>
          {caption}
        </Text>
      )}
    </Flex>
  );
}

export function InnerImage({
  id,
  containerStyle,
  style,
  scale,
  pos,
  rotate,
  onChange,
  src,
  ...props
}) {
  const [img, setImg] = useState();
  const [curImgDimension, setCurImgDimension] = useState();
  const [showEditOption, setShowEditOption] = useState(false);
  const [editState, setEditState] = useState(EDIT_STATES.view);
  const [imgScale, setScale] = useState(scale || DEFAULT_SCALE);
  const [position, setPosition] = useState(pos || DEFAULT_POSITION);
  const [rotation, setRotation] = useState(rotate || DEFAULT_ROTATION);
  const [ref, setRef] = useState();
  const [containerDimension, setContainerDimension] = useState();
  const [imgSrc, setImgSrc] = useState();

  const { dispatch } = useContext(AppStoreContext);
  const { state: routeState, dispatch: routeDisptach } = useContext(
    RouteStoreContext
  );
  const routeTo = setRouteState(routeState, routeDisptach);

  const initPos = useRef();
  const isViewState = editState === EDIT_STATES.view;
  const isMoveState = editState === EDIT_STATES.move;
  const isMovingState = editState === EDIT_STATES.moving;

  const editted =
    imgScale.top !== DEFAULT_SCALE.top ||
    imgScale.left !== DEFAULT_SCALE.left ||
    position !== DEFAULT_POSITION ||
    rotation !== DEFAULT_ROTATION;

  useEffect(() => {
    function handleMouseMove(e) {
      const mousePosition = getPosition(e);
      if (mousePosition && initPos.current) {
        const delta = {
          x: initPos.current.x - mousePosition.x,
          y: initPos.current.y - mousePosition.y
        };
        const extraWidth = (img.width * imgScale - img.width) / 2;
        const extraHeight = (img.height * imgScale - img.height) / 2;
        const maxWidth = img.width + extraWidth - containerDimension.width;
        const maxHeight = img.height + extraHeight - containerDimension.height;
        const top = Math.min(
          Math.max(maxHeight * -1, position.top - delta.y),
          extraHeight
        );
        const left = Math.min(
          Math.max(maxWidth * -1, position.left - delta.x),
          extraWidth
        );
        setPosition({ top, left });
      }
    }
    function handleMouseUp() {
      if (isMovingState) {
        setEditState(EDIT_STATES.move);
        initPos.current = null;
      }
    }
    if (editState === EDIT_STATES.moving) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [editState]);

  // get the original image's dimensions
  useEffect(() => {
    if (containerDimension && !editted) {
      const image = new window.Image();
      let newSrc = src;
      // if it is a landscape photo we want to use full height
      if (containerDimension.width > containerDimension.height) {
        newSrc = `${src}/:/rs=w:${containerDimension.width}`;
      } else {
        // portait photo we want to use full width
        newSrc = `${src}/:/rs=h:${containerDimension.height}`;
      }
      image.onload = function() {
        const dimension = { width: image.width, height: image.height };
        setImg(dimension);
        setCurImgDimension(dimension);
        setImgSrc(newSrc);
      };
      image.src = newSrc;
    }
  }, [containerDimension, editted, src]);

  // get the container's dimensions
  useEffect(() => {
    if (ref) {
      const dimensions = ref.getBoundingClientRect();
      setContainerDimension(dimensions);
    }
  }, [containerStyle, ref]);

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
    onChange({ id, pos: position, scale: imgScale });
  }

  const handleScale = useCallback(newScale => {
    setScale(1 + newScale);
  }, []);

  function handleImageSelect(img) {
    if (img) {
      onChange({ id, img, position: DEFAULT_POSITION, scale: DEFAULT_SCALE });
      setPosition(DEFAULT_POSITION);
      setScale(DEFAULT_SCALE);
      setRotation(DEFAULT_ROTATION);
    }
  }

  const handleOnImageClick = useCallback(() => {
    return void dispatch({
      type: SET_MODAL_ACTION,
      payload: <ImagePicker onSelect={handleImageSelect} />
    });
  }, [dispatch]);

  const handleRotateRight = useCallback(() => {
    setRotation((rotation + 90) % 360);
    setCurImgDimension({
      width: curImgDimension.height,
      height: curImgDimension.width
    });
  }, [rotation, setRotation, curImgDimension, setCurImgDimension]);

  const handleDelete = function() {
    onChange({ id, img: null });
    routeTo({ route: "/", field: "" });
  };

  const handleNavigate = e => {
    e.stopPropagation();
    routeTo({
      route: routes.IMAGE,
      focused: id
    });
  };

  const showToolbar = showEditOption;
  const imageToolbar = showToolbar ? (
    <Layer>
      <Align node={ref} offset={{ top: 47, left: -10 }}>
        <ImageToolbar
          items={
            isViewState
              ? ["delete", "move", "image", "container"]
              : isMoveState || isMovingState
              ? ["save", "exit"]
              : []
          }
          containerStyle={containerStyle}
          onContainerChange={newStyle =>
            onChange({ id, containerStyle: newStyle })
          }
          onRotateRight={handleRotateRight}
          onMoveClick={() => setEditState(EDIT_STATES.move)}
          onSave={saveMove}
          onImage={handleOnImageClick}
          onExit={exitMove}
          onDelete={handleDelete}
        />
      </Align>
    </Layer>
  ) : null;

  const styles = getStyles(containerStyle, img, position, imgScale, rotation);
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
            setEditState(EDIT_STATES.moving);
            initPos.current = getPosition(e);
          }
        }}
        onClick={handleNavigate}
      >
        {imageToolbar}
        <div style={styles.container} className="full-img-container">
          <Image style={{ visible: !!img }} src={imgSrc} {...props} />
        </div>
        {(isMoveState || isMovingState) && (
          <Slider defaultValue={scale - DEFAULT_SCALE} onChange={handleScale} />
        )}
      </div>
    </>
  );
}

export { Image };
