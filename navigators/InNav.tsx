import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import { BLACK_COLOR } from "../colors";

const Nav = createNativeStackNavigator();

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
      <Nav.Screen name="Home" component={Home} />
    </Nav.Navigator>
  );
}
