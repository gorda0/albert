import { TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

import colors from "@constants/colors";
import Icon from "@expo/vector-icons/Feather";

import {
  ModalContainer,
  Box,
  CenteredContainer,
  TextContainer,
  ButtonRow,
  ConfirmContainer,
  ConfirmText,
  MessageText,
} from "./styles";

interface DeleteModalProps {
  message: string;
  isVisible: boolean;
  onConfirm: () => void;
}

const MessageDialog = ({ message, isVisible, onConfirm }: DeleteModalProps) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onConfirm}>
      <ModalContainer>
        <Box>
          <CenteredContainer>
            <Icon color={colors.magenta} size={40} name="alert-triangle" />
          </CenteredContainer>
          <TextContainer>
            <MessageText>{message}</MessageText>
          </TextContainer>

          <ButtonRow>
            <ConfirmContainer>
              <TouchableOpacity onPress={onConfirm}>
                <ConfirmText>Ok!</ConfirmText>
              </TouchableOpacity>
            </ConfirmContainer>
          </ButtonRow>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default MessageDialog;
