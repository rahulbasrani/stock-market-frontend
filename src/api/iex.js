import axios from "axios";

const api = axios.create({
  baseURL: "https://sandbox.iexapis.com/stable",
});

const token = process.env.REACT_App_Token;

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
    `https://sandbox.iexapis.com/stable/stock/${symbols}/chart/time-series?on=${dates}&token=${token}`
  ).then((response) => response.json());

  return data;
};
