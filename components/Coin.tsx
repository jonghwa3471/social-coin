import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef } from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { InNavParamsList } from "../navigators/InNav";

const Wrapper = styled(Animated.createAnimatedComponent(View))`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 5px;
  align-items: center;
`;

const CoinName = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

export const Icon = styled.Image`
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 20px;
`;

interface CoinProps {
  coinId: string;
  symbol: string;
  index: number;
}

export default function Coin({ symbol, index, coinId }: CoinProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<InNavParamsList>>();
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(opacity, {
      toValue: 1,
      useNativeDriver: true,
      delay: index * 50,
    }).start();
  }, []);
  const scale = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });
  return (
    <TouchableOpacity
      style={{ flex: 0.3 }}
      onPress={() => navigation.navigate("Detail", { symbol, coinId })}
    >
      <Wrapper style={{ opacity, transform: [{ scale }] }}>
        <Icon
          source={{
            uri: `https://static.coinpaprika.com/coin/${coinId}/logo.png`,
          }}
        />
        <CoinName>{symbol}</CoinName>
      </Wrapper>
    </TouchableOpacity>
  );
}
