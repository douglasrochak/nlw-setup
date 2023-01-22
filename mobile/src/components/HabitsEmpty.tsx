import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";

export function HabitsEmpty() {
  const { navigate } = useNavigation();
  return (
    <>
      <Text className="text-zinc-400 text-base">
        Você ainda não tem nenhum hábito cadastrado nesse dia.{" "}
      </Text>
      <Text
        onPress={() => navigate("new")}
        className="text-violet-400 text-base underline  active:text-violet-500"
      >
        Cadastrar um novo hábito agora!
      </Text>
    </>
  );
}
