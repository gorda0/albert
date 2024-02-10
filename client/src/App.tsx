import React from "react";
import { Platform, UIManager } from "react-native";

import { WashProvider } from "@contexts/WashContext";
import WashStack from "@navigation/WashStack";
import { WashNavigationProps } from "@navigation/types";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import BaseWashTemplate from "@templates/WashBase";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function App() {
  const navigationContainerRef = useNavigationContainerRef<WashNavigationProps>();

  return (
    <WashProvider>
      <NavigationContainer ref={navigationContainerRef}>
        <BaseWashTemplate>
          <WashStack initialRoute="WashList" />
        </BaseWashTemplate>
      </NavigationContainer>
    </WashProvider>
  );
}

export default App;
