import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import styled from "styled-components/native";

const Wrapper = styled(Animated.createAnimatedComponent(View))`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 5px;
  align-items: center;
  flex: 0.3;
`;

const CoinName = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

const Icon = styled.Image`
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
    <Wrapper style={{ opacity, transform: [{ scale }] }}>
      <Icon
        source={{
          uri: `https://static.coinpaprika.com/coin/${coinId}/logo.png`,
        }}
      />
      <CoinName>{symbol}</CoinName>
    </Wrapper>
  );
}
