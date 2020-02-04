import React from "react";

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
];

export default function Toolbar({ items, onStartCrop, onContainerChange }) {
  return (
    <div className="image-edit-toolbar">
      {items.includes("crop") && (
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
      )}
      {items.includes("container") && (
        <ToolbarIcon name="image">
          <List className="toolbar-list">
            {containerIcons.map(icon => (
              <ListItem onClick={() => void onContainerChange(icon.name)}>
                <Icon name={icon.name} />
                <span>{icon.label}</span>
              </ListItem>
            ))}
          </List>
        </ToolbarIcon>
      )}
    </div>
  );
}
