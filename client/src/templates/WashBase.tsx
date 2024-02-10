import { PropsWithChildren, useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { LayoutAnimation, StatusBar } from "react-native";

import colors from "@constants/colors";
import { WashContext } from "@contexts/WashContext";
import { WashNavigationProps } from "@navigation/types";
import { useNavigation } from "@react-navigation/native";

import Header from "@components/Header";
import { TouchableIcon } from "@components/TouchableIcon";

import { ApplicationContainer, BaseChildren, Container, SafeContainer } from "./styles";

const BaseWashTemplate = ({ children }: PropsWithChildren) => {
  const { tempMethod, resetTempMethod } = useContext(WashContext);
  const navigation = useNavigation<WashNavigationProps>();

  const getRouteName = () => navigation.getState()?.routes[navigation.getState()?.index].name;
  const isWashRoute = () => getRouteName() === "Wash";

  const [isWashScreen, setIsWashScreen] = useState(isWashRoute());

  const headerLabel = !isWashScreen ? "Agendamentos" : "Novo agendamento";

  useEffect(() => {
    navigation.addListener("state", () => {
      setIsWashScreen(isWashRoute());
    });
  }, []);

  return (
    <ApplicationContainer>
      <Container>
        <SafeContainer>
          <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
          <Header
            name={headerLabel}
            leftItem={
              isWashScreen && (
                <TouchableIcon
                  name="chevron-left"
                  onPress={() => {
                    navigation?.goBack();
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                  }}
                  color="white"
                  size={32}
                />
              )
            }
            rightItem={
              <TouchableIcon
                name={isWashScreen ? "check" : "plus"}
                onPress={() => {
                  if (isWashScreen) {
                    tempMethod.method?.();
                    resetTempMethod();
                  } else {
                    navigation?.navigate("Wash", {});
                  }

                  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                }}
                color="white"
                size={30}
              />
            }
          />
        </SafeContainer>
      </Container>

      <BaseChildren>{children}</BaseChildren>
    </ApplicationContainer>
  );
};

export default BaseWashTemplate;
