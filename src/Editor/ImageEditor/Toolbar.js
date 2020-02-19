import React from "react";
import cx from "classnames";

import { List, ListItem } from "../../Theme/Elements/List";
import { Icon, ToolbarIcon } from "../../Theme/Elements/Icon";
import * as cropStyles from "../../constants/cropStyles";
import * as containerStyles from "../../constants/containerStyles";

const cropIcons = [
  { name: cropStyles.square, label: "Square" },
  { name: cropStyles.horizontal, label: "Horizontal" },
  { name: cropStyles.vertical, label: "Vertical" },
  { name: cropStyles.freeform, label: "Freeform" }
];

const containerIcons = [
  { name: containerStyles.square, label: "Square" },
  { name: containerStyles.horizontal, label: "Horizontal" },
  { name: containerStyles.vertical, label: "Vertical" }
  // { name: containerStyles.resize, label: "Resize" }
];

export default function Toolbar({
  items,
  isWidgetLevel,
  onStartCrop,
  containerStyle,
  onContainerChange,
  onMoveClick,
  onSave,
  onRotateRight,
  onImage,
  onExit
}) {
  const actions = {
    crop: (
      <ToolbarIcon name="crop">
        <List className="toolbar-list">
          {cropIcons.map(icon => (
            <ListItem onClick={() => void onStartCrop(icon.name)}>
              <Icon name={icon.name} />
              <span>{icon.label}</span>
            </ListItem>
          ))}
        </List>
      </ToolbarIcon>
    ),
    container: (
      <ToolbarIcon name="crop">
        <List className="toolbar-list">
          {containerIcons.map(icon =>
            isWidgetLevel && icon.name === containerStyles.resize ? null : (
              <ListItem
                className={cx({ selected: containerStyle === icon.name })}
                onClick={() => void onContainerChange(icon.name)}
              >
                <Icon name={icon.name} />
                <span>{icon.label}</span>
              </ListItem>
            )
          )}
        </List>
      </ToolbarIcon>
    ),
    move: <Icon name="move" onClick={onMoveClick} />,
    save: <Icon name="check" onClick={onSave} />,
    exit: <Icon name="close" onClick={onExit} />,
    image: <Icon name="image" onClick={onImage} />,
    rotateRight: <Icon name="rotateRight" onClick={onRotateRight} />
  };
  return (
    <div className="image-edit-toolbar">
      {items.map(item => actions[item] || null)}
    </div>
  );
}
