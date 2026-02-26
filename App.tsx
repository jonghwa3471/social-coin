import auth from "@react-native-firebase/auth";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    console.log(auth().currentUser);
  }, []);
  return null;
}
