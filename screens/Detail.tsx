import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import { InNavParamsList } from "../navigators/InNav";
import { useEffect } from "react";
import { Icon } from "../components/Coin";
import { useQuery } from "@tanstack/react-query";
import { history, info } from "../api";

const Container = styled.View``;

export default function Detail({
  route,
  navigation,
}: NativeStackScreenProps<InNavParamsList, "Detail">) {
  const { symbol, coinId } = route.params;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Icon
          source={{
            uri: `https://static.coinpaprika.com/coin/${coinId}/logo.png`,
          }}
        />
      ),
    });
  }, []);
  const { isLoading: infoLoading, data: infoData } = useQuery({
    queryKey: ["coinInfo", coinId],
    queryFn: info,
  });
  const { isLoading: historyLoading, data: historyData } = useQuery({
    queryKey: ["coinHistory", coinId],
    queryFn: history,
  });
  console.log(infoData);
  return <Container></Container>;
}
