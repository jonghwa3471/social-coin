import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import { BLACK_COLOR } from "../colors";

export type InNavParamsList = {
  코인: undefined;
};

const Nav = createNativeStackNavigator<InNavParamsList>();

export default function InNav() {
  return (
    <Nav.Navigator
      screenOptions={{
        presentation: "modal",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: BLACK_COLOR,
        },
      }}
    >
      <Nav.Screen name="코인" component={Home} />
    </Nav.Navigator>
  );
}
