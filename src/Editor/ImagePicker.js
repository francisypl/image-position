import React, { useState, useContext } from "react";

import {
  Flex,
  Container,
  Heading,
  Image,
  Grid,
  Button
} from "../Theme/Elements";
import AppStoreContext, { getAllImages } from "../common/AppStoreContext";

export default function ImagePicker({ onSelect }) {
  const { state } = useContext(AppStoreContext);
  const images = getAllImages(state);
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
              <Image src={image} />
            ))}
          </Grid>
        </Container>
        <div className="img-picker-btn-container">
          <Button className="main">Select</Button>
          <Button className="secondary">Cancel</Button>
        </div>
      </Flex>
    </Container>
  );
}
