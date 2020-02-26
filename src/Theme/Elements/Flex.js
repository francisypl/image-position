import React from "react";
import { StyledFlex } from "./Styled";
import { useTheme } from "../";

export function Flex(props) {
  const theme = useTheme();
  return <StyledFlex theme={theme} {...props} />;
}

export function Inline(props) {
  return <Flex alignItems="center" justifyContent="space-between" {...props} />;
}
