import React from "react";
import { StyledInput } from "./Styled";
import { useTheme } from "../";

export function Input(props) {
  const theme = useTheme();
  return <StyledInput className="el-input" theme={theme} {...props} />;
}
