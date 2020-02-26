import React, { useContext } from "react";

import RouteStoreContext, { getFocused } from "../common/RouteStoreContext";
import AppStoreContext, {
  getDataById,
  setPropertyById
} from "../common/AppStoreContext";

import { Inline, Toggle, Label, Input, Flex } from "../Theme/Elements";

export default function ImageMutatorView() {
  const { state: routeState } = useContext(RouteStoreContext);
  const { state: appState, dispatch: appDispatch } = useContext(
    AppStoreContext
  );
  const { caption, link, id } = getDataById(appState, getFocused(routeState));
  const setImg = setPropertyById(appState, appDispatch);

  return (
    <>
      <Flex flexDirection="column">
        <Label>Caption</Label>
        <Input
          mt={10}
          value={caption}
          onChange={e => setImg({ id, caption: e.target.value })}
        />
      </Flex>
      <Inline mb={15}>
        <Label>Add Link</Label>
        <Toggle
          value={link.enabled}
          onChange={enabled => setImg({ id, link: { ...link, enabled } })}
        />
      </Inline>
      {link.enabled && (
        <Flex flexDirection="column">
          <Label>External Url</Label>
          <Input
            placeholder="https://"
            mt={10}
            value={link.external || ""}
            onChange={e =>
              setImg({ id, link: { ...link, external: e.target.value } })
            }
          />
        </Flex>
      )}
    </>
  );
}
