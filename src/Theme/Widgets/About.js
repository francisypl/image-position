import React, { useContext } from "react";
import uuid from "uuid";
import {
  Base,
  Text,
  Heading,
  Section,
  Flex,
  Container,
  Grid,
  ImageContainer,
  Button
} from "../Elements";
import Widget from "./Widget";
import AppStoreContext, {
  getAboutCards,
  setAboutProperty
} from "../../common/AppStoreContext";

const textString =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et ligula ullamcorper malesuada proin libero nunc.";
export default function About(props) {
  const { state, dispatch } = useContext(AppStoreContext);
  const data = getAboutCards(state);
  return (
    <Widget showToolbar {...props}>
      <Section bg="pageBackground" py={80} px={20}>
        <Container>
          <Grid
            className="about-grid"
            gridTemplateColumns="minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)"
            gridGap="2em"
          >
            {data.map(({ id, img, containerStyle, pos, scale }, i) => (
              <Flex key={i} flexDirection="column" justifyContent="flex-start">
                {img && (
                  <ImageContainer
                    id={id}
                    src={img}
                    containerStyle={containerStyle}
                    pos={pos && pos[containerStyle]}
                    scale={scale && scale[containerStyle]}
                    onChange={setAboutProperty(state, dispatch)}
                  />
                )}
                <Heading level={4} textStyle="h4" mt={24} mb={24}>
                  Sub Heading
                </Heading>
                <Text textStyle="text">{textString}</Text>
                <Base mt={24}>
                  <Button variant="secondary">Learn More</Button>
                </Base>
              </Flex>
            ))}
          </Grid>
        </Container>
      </Section>
    </Widget>
  );
}
