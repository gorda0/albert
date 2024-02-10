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

interface ConfirmDialogProps {
  label: string;
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmDialog = ({ label, isVisible, onCancel, onConfirm }: ConfirmDialogProps) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onCancel}>
      <ModalContainer>
        <Box>
          <CenteredContainer>
            <Icon color={colors.green} size={40} name="check" />
          </CenteredContainer>
          <TextContainer>
            <MessageText>Deseja concluir o agendamento para o veículo {label.toUpperCase()}?</MessageText>
          </TextContainer>

          <ButtonRow>
            <CancelContainer>
              <TouchableOpacity onPress={onCancel}>
                <CancelText>Cancelar</CancelText>
              </TouchableOpacity>
            </CancelContainer>
            <ConfirmContainer style={{
              backgroundColor: colors.green
            }}>
              <TouchableOpacity onPress={onConfirm}>
                <ConfirmText>Concluir</ConfirmText>
              </TouchableOpacity>
            </ConfirmContainer>
          </ButtonRow>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default ConfirmDialog;
