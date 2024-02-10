import { TextInput } from "react-native";

import colors from "@constants/colors";
import styled from "styled-components";

import { BoldLabel } from "@components/Dialog/styles";
import MaskInput from "react-native-mask-input";

export const Input = styled(MaskInput)`
  min-height: 50px;
  font-size: 18px;
  border-radius: 10px;
  padding: 10px;
  background-color: white;
  color: ${colors.grayBold};
`;

export const Label = styled(BoldLabel)`
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 5px;
`;
