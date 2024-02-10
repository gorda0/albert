import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import colors from "@constants/colors";
import styled from "styled-components";

import { RowContainer } from "@components/Header/styles";

export const PageTitle = styled(Text)`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.grayBold};
`;

export const WashCounter = styled(Text)`
  color: ${colors.gray};
`;

export const ListContainer = styled(ScrollView)`
  margin-top: 10px;
  flex: 1;
`;

export const WashItem = styled(View)`
  flex: 1;
  background-color: #fff;
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 10px;
`;

export const WashLabel = styled(Text)`
  font-size: 16px;
  font-weight: 600;
`;

export const Container = styled(RowContainer)`
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 20px;
  margin-top: 20px;
`;
