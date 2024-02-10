import { ComponentProps, ComponentPropsWithRef } from "react";
import { TouchableOpacity, ColorValue } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export const TouchableIcon = ({
  name,
  color,
  size,
  ...props
}: ComponentPropsWithRef<typeof TouchableOpacity> & {
  name: ComponentProps<typeof Icon>["name"];
  size: number;
  color?: ColorValue;
}) => (
  <TouchableOpacity {...props}>
    <Icon name={name} size={size} color={color} />
  </TouchableOpacity>
);
