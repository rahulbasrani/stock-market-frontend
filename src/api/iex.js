import axios from "axios";

const api = axios.create({
  baseURL: REACT_App_BASE_URL_IEX,
});

const token = REACT_App_Token;

export const loadQuotesForStock = (symbol) => {
  return api
    .get(`/stock/${symbol}/quote?token=${token}`)
    .then((res) => res.data);
};

export const loadLogoForStock = (symbol) => {
  return `https://storage.googleapis.com/iex/api/logos/${symbol}.png`;
};

export const loadRecentNewsForStock = (symbol) => {
  return api
    .get(`/stock/${symbol}/news?token=${token}`)
    .then((res) => res.data);
};

export const loadChartForStock = (symbol, range) => {
  return api
    .get(`/stock/${symbol}/chart/${range}?token=${token}`)
    .then((res) => res.data);
};

// const dates = "2018-09-07";
// const symbols = "AMZN";
export const loadChartForDate = async (symbols, dates) => {
  const data = await fetch(
    `${REACT_App_BASE_URL_IEX}/stock/${symbols}/chart/time-series?on=${dates}&token=${token}`
  ).then((response) => response.json());

  return data;
};
