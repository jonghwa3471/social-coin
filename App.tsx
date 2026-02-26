import { getApp } from "@react-native-firebase/app";
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import InNav from "./navigators/InNav";
import OutNav from "./navigators/OutNav";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const app = getApp();
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  return (
    <NavigationContainer>
      {isLoggedIn ? <InNav /> : <OutNav />}
    </NavigationContainer>
  );
}
