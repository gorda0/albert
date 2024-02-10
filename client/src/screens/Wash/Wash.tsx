import { useContext, useEffect } from "react";

import { WashContext } from "@contexts/WashContext";
import { WashNavigationProps } from "@navigation/types";
import { useNavigation } from "@react-navigation/native";

import WashForm from "@components/WashForm";
import { BlankView } from "@components/BlankView";
import MessageDialog from "@components/Dialog/MessageDialog";
import WashService from "src/services/wash";

const WashScreen = () => {
  const navigation = useNavigation<WashNavigationProps<"Wash">>();
  const { errors, updateTempMethod, cleanErrors, fetchWashes, scheduleWash, listAvailableCalendar } =
    useContext(WashContext);

    useEffect(() => {
      fetchWashes();
      listAvailableCalendar();
    }, []);

  return (
    <BlankView>
      <WashForm
        onSubmit={(body) => {
          scheduleWash(body, () => {
            fetchWashes();

            navigation.goBack();
          });
          
        }}
        updateTempMethod={updateTempMethod}
      />
      <MessageDialog
        isVisible={!!errors.length}
        onConfirm={() => {
          cleanErrors();
        }}
        message={errors[errors.length - 1]?.message || ""}
      />
    </BlankView>
  );
};

export default WashScreen;
