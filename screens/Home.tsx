import { useQuery } from "@tanstack/react-query";
import styled from "styled-components/native";
import { coins } from "../api";
import { ActivityIndicator, FlatList, FlatListProps } from "react-native";
import { BLACK_COLOR } from "../colors";
import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { InNavParamsList } from "../navigators/InNav";
import Coin from "../components/Coin";

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

const List = styled(FlatList as React.ComponentType<FlatListProps<ICoin>>)`
  padding: 20px 10px;
  width: 100%;
`;

export interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export default function Home({
  navigation,
}: NativeStackScreenProps<InNavParamsList, "코인">) {
  const { isLoading, data } = useQuery<ICoin[]>({
    queryKey: ["coins"],
    queryFn: coins,
  });
  const [cleanData, setCleanData] = useState<ICoin[]>();
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
      <List
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        contentContainerStyle={{ gap: 10 }}
        data={cleanData}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Coin index={index} coinId={item.id} symbol={item.symbol} />
        )}
      />
    </Container>
  );
}
