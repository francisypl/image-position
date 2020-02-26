import React, { useContext } from "react";
import {
  Text,
  Heading,
  Section,
  Flex,
  Button,
  Grid,
  ImageContainer
} from "../Elements";
import Widget from "./Widget";
import AppStoreContext, {
  getWelcome,
  setWelcome
} from "../../common/AppStoreContext";

const textString =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et ligula ullamcorper malesuada proin libero nunc.";
export default function Welcome(props) {
  const { state, dispatch } = useContext(AppStoreContext);
  const { id, img, containerStyle, pos, scale } = getWelcome(state);
  const hasImage = !!img;
  const columns = hasImage ? "1fr 1fr" : "1fr";
  return (
    <Widget {...props}>
      <Section bg="pageBackground" py={80} px={20}>
        <Grid gridTemplateColumns={columns}>
          {hasImage && (
            <ImageContainer
              id={id}
              src={img}
              containerStyle={containerStyle}
              pos={pos}
              scale={scale}
              onChange={setWelcome(state, dispatch)}
            />
          )}
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            maxWidth="75%"
            mx="auto"
          >
            <Heading level={2} textStyle="h2" mb={24}>
              Sub Heading
            </Heading>
            <Text textStyle="text" mb={32}>
              {textString}
            </Text>
            <Button variant="primary">Welcome</Button>
          </Flex>
        </Grid>
      </Section>
    </Widget>
  );
}
