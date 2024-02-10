import { TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Feather";

import colors from "@constants/colors";

import {
  ModalContainer,
  Box,
  CenteredContainer,
  TextContainer,
  BoldLabel,
  ButtonRow,
  CancelContainer,
  CancelText,
  ConfirmContainer,
  ConfirmText,
  MessageText,
} from "./styles";

interface DeleteModalProps {
  label: string;
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteModal = ({ label, isVisible, onCancel, onConfirm }: DeleteModalProps) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onCancel}>
      <ModalContainer>
        <Box>
          <CenteredContainer>
            <Icon color={colors.magenta} size={40} name="trash" />
          </CenteredContainer>
          <TextContainer>
            <MessageText>Deseja cancelar o agendamento</MessageText>
            <BoldLabel>{label.toUpperCase()}?</BoldLabel>
          </TextContainer>

          <ButtonRow>
            <CancelContainer>
              <TouchableOpacity onPress={onCancel}>
                <CancelText>Não!</CancelText>
              </TouchableOpacity>
            </CancelContainer>
            <ConfirmContainer>
              <TouchableOpacity onPress={onConfirm}>
                <ConfirmText>Com certeza</ConfirmText>
              </TouchableOpacity>
            </ConfirmContainer>
          </ButtonRow>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default DeleteModal;
