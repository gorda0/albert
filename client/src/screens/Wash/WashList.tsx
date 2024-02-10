import { useCallback, useContext, useState } from "react";
import {
  LayoutAnimation,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "@constants/colors";
import { WashContext } from "@contexts/WashContext";
import { WashNavigationProps } from "@navigation/types";
import { useNavigation } from "@react-navigation/native";

import { BlankView } from "@components/BlankView";
import DeleteDialog from "@components/Dialog/DeleteDialog";
import { RowContainer } from "@components/Header/styles";
import { TouchableIcon } from "@components/TouchableIcon";

import { Wash, WashStatus, WashType } from "@models/wash";

import {
  WashCounter,
  WashItem,
  ListContainer,
  PageTitle,
  Container,
  WashLabel,
} from "./styles";
import ConfirmDialog from "@components/Dialog/ConfirmDialog";

const washMatcher = {
  [WashType.COMPLETE]: "completa",
  [WashType.SIMPLE]: "cimples",
};

const WashListScreen = () => {
  const navigation = useNavigation<WashNavigationProps<"WashList">>();
  const { washes, cancelWash, confirmWash, fetchWashes } =
    useContext(WashContext);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedWash, setSelectedWash] = useState<Wash | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchWashes();
    setRefreshing(false);
  }, []);
  return (
    <BlankView>
      <RowContainer>
        <PageTitle>Listagem</PageTitle>
        <WashCounter>{washes.length} agendamentos</WashCounter>
      </RowContainer>

      <ListContainer
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {washes.map((wash, washIdx) => (
          <WashItem key={wash.plate + washIdx}>
            <Container>
              <View>
                <WashLabel
                  style={{
                    color:
                      wash.type === WashType.COMPLETE
                        ? colors.green
                        : colors.orange,
                    marginBottom: 10,
                    fontWeight: "bold",
                  }}
                >
                  {wash.plate.toUpperCase()}
                </WashLabel>
                <WashLabel>
                  {new Date(wash.scheduleDay).toLocaleDateString()} às{" "}
                  {wash.scheduleHour}
                </WashLabel>
                <WashLabel
                  style={{
                    color:
                      wash.status !== WashStatus.COMPLETE
                        ? wash.type === WashType.COMPLETE
                          ? colors.primary
                          : colors.magenta
                        : colors.grayLight,
                  }}
                >
                  {wash.status !== WashStatus.COMPLETE
                    ? `Lavagem ${washMatcher[wash.type]}`
                    : `Lavagem concluída`}
                </WashLabel>
              </View>
              {wash.status !== WashStatus.COMPLETE && (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedWash(wash);
                    setOpenConfirmModal(true);
                  }}
                  style={{
                    backgroundColor: colors.green,
                    padding: 10,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "white",
                    }}
                  >
                    Concluir
                  </Text>
                </TouchableOpacity>
              )}
              {wash.status !== WashStatus.COMPLETE && (
                <TouchableIcon
                  name="trash"
                  size={20}
                  color={colors.grayLight}
                  onPress={() => {
                    setSelectedWash(wash);
                    setOpenDeleteModal(true);
                  }}
                />
              )}
            </Container>
          </WashItem>
        ))}
      </ListContainer>
      <DeleteDialog
        isVisible={openDeleteModal}
        label={selectedWash?.plate || ""}
        onCancel={() => setOpenDeleteModal(false)}
        onConfirm={() => {
          if (selectedWash) {
            cancelWash(selectedWash.id);
            setOpenDeleteModal(false);
          }
        }}
      />
      <ConfirmDialog
        isVisible={openConfirmModal}
        label={selectedWash?.plate || ""}
        onCancel={() => setOpenConfirmModal(false)}
        onConfirm={() => {
          if (selectedWash) {
            confirmWash(selectedWash.id);
            setOpenConfirmModal(false);
          }
        }}
      />
    </BlankView>
  );
};

export default WashListScreen;
