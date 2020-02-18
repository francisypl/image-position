import React, { useState, useContext, useCallback } from "react";
import cx from "classnames";

import {
  Flex,
  Container,
  Heading,
  Image,
  Grid,
  Button
} from "../Theme/Elements";
import AppStoreContext, {
  getAllImages,
  UNSET_MODAL_ACTION
} from "../common/AppStoreContext";

export default function ImagePicker({ onSelect }) {
  const { state, dispatch } = useContext(AppStoreContext);
  const [selectedImg, setSelectedImg] = useState();
  const images = getAllImages(state);

  const handleSelect = useCallback(() => {
    onSelect(selectedImg);
    dispatch({ type: UNSET_MODAL_ACTION });
  }, [onSelect, selectedImg, dispatch]);

  return (
    <Container className="img-picker-container">
      <Flex flexDirection="column">
        <Heading padding="20px" level={1}>
          Select an image
        </Heading>
        <Container className="img-picker-gallery">
          <Grid
            gridColumnGap="10px"
            gridRowGap="10px"
            gridTemplateColumns="1fr 1fr 1fr"
          >
            {images.map(image => (
              <Image
                className={cx("img-picker-img", {
                  selected: image === selectedImg
                })}
                onClick={() => setSelectedImg(image)}
                key={image}
                src={image}
              />
            ))}
          </Grid>
        </Container>
        <div className="img-picker-btn-container">
          <Button onClick={handleSelect} className="main">
            Select
          </Button>
          <Button
            className="secondary"
            onClick={() => dispatch({ type: UNSET_MODAL_ACTION })}
          >
            Cancel
          </Button>
        </div>
      </Flex>
    </Container>
  );
}
