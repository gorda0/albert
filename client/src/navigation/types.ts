import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type WashStackParamMap = {
  Wash: {
    washId?: string;
  };
  WashList: undefined;
};

export type StackKeys = keyof WashStackParamMap;
export type WashNavigationProps<T extends StackKeys | undefined = undefined> = T extends StackKeys
  ? StackNavigationProp<WashStackParamMap, T>
  : StackNavigationProp<WashStackParamMap>;
export type WashRouteProps<T extends StackKeys | undefined = undefined> = T extends StackKeys
  ? RouteProp<WashStackParamMap, T>
  : RouteProp<WashStackParamMap>;
