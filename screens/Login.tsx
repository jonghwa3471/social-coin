import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import { OutNavParamList } from "../navigators/OutNav";
import { BLACK_COLOR } from "../colors";

const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
  color: white;
`;

const Wrapper = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  font-size: 16px;
  text-align: center;
  color: white;
`;
const Btn = styled.TouchableOpacity``;

const BtnTxt = styled.Text`
  font-size: 16px;
  color: white;
`;

export default function Login({
  navigation,
}: NativeStackScreenProps<OutNavParamList>) {
  const { navigate } = navigation;
  return (
    <Container>
      <Wrapper>
        <Text>Don't have an account? </Text>
        <Btn onPress={() => navigate("Join")}>
          <BtnTxt>Join &rarr;</BtnTxt>
        </Btn>
      </Wrapper>
    </Container>
  );
}
