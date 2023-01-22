import {
  TouchableOpacity,
  View,
  Text,
  TouchableOpacityProps,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";

interface CheckboxProps extends TouchableOpacityProps {
  title: string;
  checked?: boolean;
}

export function Checkbox({ title, checked = false, ...rest }: CheckboxProps) {
  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.7}
      className="flex-row m-2 items-center"
    >
      {checked ? (
        <Animated.View
          entering={FadeInUp}
          exiting={FadeOutDown}
          className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
        >
          <Feather name="check" size={20} color={colors.white} />
        </Animated.View>
      ) : (
        <View className="h-8 w-8 bg-zinc-700 rounded-lg"></View>
      )}
      <Text className="text-white text-base ml-3 font-semibold">{title}</Text>
    </TouchableOpacity>
  );
}
