import { useQuery } from "@tanstack/react-query";
import styled from "styled-components/native";
import { coins } from "../api";
import { ActivityIndicator, FlatList } from "react-native";
import { BLACK_COLOR } from "../colors";
import { useEffect, useState } from "react";

const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
  justify-content: center;
  align-items: center;
`;

const Coin = styled.View`
  align-items: center;
`;

const CoinName = styled.Text`
  color: white;
`;

const CoinSymbol = styled.Text`
  color: white;
`;

interface coin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export default function Home() {
  const { isLoading, data } = useQuery<coin[]>({
    queryKey: ["coins"],
    queryFn: coins,
  });
  const [cleanData, setCleanData] = useState<coin[]>();
  useEffect(() => {
    if (data) {
      setCleanData(
        data?.filter(
          (coin) => coin.rank !== 0 && coin.is_active && !coin.is_new,
        ),
      );
    }
  }, [data]);
  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator color={"white"} />
      </Loader>
    );
  }
  return (
    <Container>
      <FlatList
        numColumns={5}
        data={cleanData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Coin>
            <CoinName>{item.name}</CoinName>
            <CoinSymbol>{item.symbol}</CoinSymbol>
          </Coin>
        )}
      />
    </Container>
  );
}
