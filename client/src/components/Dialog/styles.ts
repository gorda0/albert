import { View, Text } from "react-native";

import colors from "@constants/colors";
import styled from "styled-components";

export const CenteredContainer = styled(View)`
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled(CenteredContainer)`
  flex: 1;
`;

export const Box = styled(CenteredContainer)`
  background-color: white;
  border-radius: 12px;
  max-width: 80%;
  padding: 40px 20px;
`;

export const TextContainer = styled(CenteredContainer)`
  margin: 20px 0px;
`;

export const ButtonRow = styled(View)`
  flex-direction: row;
  margin: 0px;
  justify-content: space-between;
`;

export const BaseButtonContainer = styled(CenteredContainer)`
  padding: 0px;
  min-height: 50px;
`;

export const CancelContainer = styled(BaseButtonContainer)`
  flex: 1;
`;

export const ConfirmContainer = styled(BaseButtonContainer)`
  flex: 2;
  background-color: ${colors.magenta};
  padding: 0px;
  min-height: 50px;
  border-radius: 80px;
`;

export const CancelText = styled(Text)`
  color: ${colors.magenta};
`;

export const ConfirmText = styled(Text)`
  color: white;
`;

export const MessageText = styled(Text)`
  color: ${colors.grayBold};
`;

export const BoldLabel = styled(MessageText)`
  font-weight: 600;
`;
