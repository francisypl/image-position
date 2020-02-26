import React, { useState, useEffect, useCallback, useContext } from "react";
import { useTheme } from "../";
import { ThemeProvider, theme } from "../";
import ColorPickerCategory from "../../Editor/Color/ColorPickerCategory";
import { getColorPalette, generatePalette } from "../themes/getColorPalette";
import Layer from "../../Editor/Layer";
import Align from "../../Editor/Align";
import ImageToolbar from "../../Editor/ImageEditor/Toolbar";
import AppStoreContext, {
  setAboutProperty
} from "../../common/AppStoreContext";
import RouteStoreContext, {
  setRouteState
} from "../../common/RouteStoreContext";

const icon = (
  <svg width={16} height={16}>
    <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <path
        fillOpacity={0.36}
        fill="#FFF"
        fillRule="nonzero"
        d="M0 13.3333333L16 13.3333333 16 16 0 16z"
      />
      <path
        d="M12.889 7.884s-1.333 1.44-1.333 2.33c0 .737.595 1.333 1.333 1.333s1.333-.596 1.333-1.334c0-.88-1.333-2.329-1.333-2.329zm-1.591-1.848L5.253 0l-.942.942 1.413 1.414-3.688 3.68a.885.885 0 000 1.253l4 4c.177.178.4.267.63.267a.91.91 0 00.632-.258l4-4a.896.896 0 000-1.262zm-7.556.186l2.925-2.924L9.59 6.222H3.742z"
        fill="#FFF"
        fillRule="nonzero"
      />
      <path d="M0 0L16 0 16 16 0 16z" />
    </g>
  </svg>
);

export default function Widget({
  color,
  overlay = false,
  index,
  showToolbar,
  children
}) {
  const [colorOverride, setColorOverride] = useState(color);

  const [showPicker, setShowPicker] = useState(false);
  const [ref, setRef] = useState(null);
  const { colors, scheme } = useTheme();

  const { state, dispatch } = useContext(AppStoreContext);
  const setCard = setAboutProperty(state, dispatch);
  const { state: routeState, dispatch: routeDispatch } = useContext(
    RouteStoreContext
  );
  const routeTo = setRouteState(routeState, routeDispatch);

  const newTheme = theme({
    color: colors.primary,
    secondaryColor: colors.secondary,
    colorOverride: color || colorOverride,
    scheme: colorOverride ? "primary" : scheme,
    index,
    overlay
  });

  useEffect(() => {
    setColorOverride(undefined);
  }, [colors.primary, scheme]);

  useEffect(() => {
    setColorOverride(color);
  }, [color]);

  const onRefSet = useCallback(ref => {
    setRef(ref);
  }, []);

  const show = showPicker && !overlay;

  const toolbar =
    show && showToolbar ? (
      <ImageToolbar
        items={["container"]}
        onContainerChange={newStyle => setCard({ containerStyle: newStyle })}
        isWidgetLevel
      />
    ) : null;

  return (
    <div
      ref={onRefSet}
      className="widget"
      onMouseOver={() => setShowPicker(true)}
      onMouseLeave={() => setShowPicker(false)}
      onClick={() => routeTo({ route: "/", focused: "" })}
    >
      <Layer>
        <Align index={index} node={ref}>
          {toolbar}
        </Align>
      </Layer>
      <ThemeProvider theme={newTheme}>{children}</ThemeProvider>
    </div>
  );
}
