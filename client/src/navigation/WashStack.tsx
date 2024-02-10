import { ComponentProps, FC } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { WashStackParamMap, StackKeys } from "./types";
import WashListScreen from "@screens/Wash/WashList";
import WashScreen from "@screens/Wash/Wash";

const Stack = createStackNavigator<WashStackParamMap>();

type StackScreen = typeof Stack.Screen;
type UnnamedStack = Omit<ComponentProps<StackScreen>, "name">;
type StackScreenMap = Record<StackKeys, UnnamedStack>;

const washStackMap: StackScreenMap = {
  Wash: {
    component: WashScreen,
    options: { headerShown: false },
  },
  WashList: {
    component: WashListScreen,
  },
};

interface WashStackProps {
  initialRoute: StackKeys;
}

const WashStack: FC<WashStackProps> = ({ initialRoute }) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        header: () => null,
      }}
    >
      {(Object.keys(washStackMap) as Array<StackKeys>).map((key, keyIdx) => (
        <Stack.Screen
          {...(washStackMap[key] as StackScreen)}
          name={key}
          component={washStackMap[key].component as FC}
          key={key + keyIdx}
        />
      ))}
    </Stack.Navigator>
  );
};

export default WashStack;
