import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Join from "../screens/Join";
import { BLACK_COLOR } from "../colors";

export type OutNavParamList = {
  Login: undefined;
  Join: undefined;
};

const Nav = createNativeStackNavigator<OutNavParamList>();

export default function OutNav() {
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
      <Nav.Screen name="Login" component={Login} />
      <Nav.Screen name="Join" component={Join} />
    </Nav.Navigator>
  );
}
