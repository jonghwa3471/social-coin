import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import { InNavParamsList } from "../navigators/InNav";
import { useEffect, useState } from "react";
import { Icon } from "../components/Coin";
import { useQuery } from "@tanstack/react-query";
import { history, info } from "../api";
import { BLACK_COLOR } from "../colors";
import {
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
} from "victory-native";

const Container = styled.ScrollView`
  background-color: ${BLACK_COLOR};
`;

interface IhistoryData {
  timestamp: Date;
  price: number;
  volume_24h: number;
  market_cap: number;
}

type VictoryPoint = { x: number; y: number };

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
  const { isLoading: historyLoading, data: historyData } = useQuery<
    IhistoryData[]
  >({
    queryKey: ["coinHistory", coinId],
    queryFn: history,
  });

  const [victoryData, setVictoryData] = useState<VictoryPoint[] | null>(null);
  useEffect(() => {
    if (historyData) {
      setVictoryData(
        historyData?.map((price) => ({
          x: new Date(price.timestamp).getTime(),
          y: price.price,
        })),
      );
    }
  }, [historyData]);
  return (
    <Container>
      {victoryData ? (
        <VictoryChart height={360}>
          <VictoryLine
            animate
            interpolation={"monotoneX"}
            data={victoryData}
            style={{ data: { stroke: "#1abc9c" } }}
          />
          <VictoryScatter
            animate
            data={victoryData}
            style={{ data: { fill: "#1abc9c" } }}
          />
        </VictoryChart>
      ) : null}
    </Container>
  );
}
