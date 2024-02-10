import { SafeAreaView, View } from "react-native";

import colors from "@constants/colors";
import styled from "styled-components";

export const BaseChildren = styled(View)`
  background-color: ${colors.offwhite};
  flex-grow: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
`;

export const PrimaryContainer = styled(View)`
  background-color: ${colors.primary};
`;

export const ApplicationContainer = styled(PrimaryContainer)`
  flex: 1;
  background-color: ${colors.primary};
`;

export const Container = styled(PrimaryContainer)`
  flex-shrink: 1;
`;

export const SafeContainer = styled(SafeAreaView)`
  background-color: ${colors.primary};
  padding-top: 10px;
`;
