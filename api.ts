import { QueryFunctionContext } from "@tanstack/react-query";

const BASE_URL = "https://api.coinpaprika.com/v1";
const COINS_URL = `${BASE_URL}/coins`;

export const coins = () => fetch(COINS_URL).then((response) => response.json());

export const info = ({ queryKey }: QueryFunctionContext) =>
  fetch(`${COINS_URL}/${queryKey[1]}`).then((response) => response.json());

export const history = ({ queryKey }: QueryFunctionContext) =>
  fetch(
    `${BASE_URL}/tickers/${queryKey[1]}/historical?${new Date().toISOString().split("T")[0]}&interval=30m`,
  ).then((response) => response.json());
