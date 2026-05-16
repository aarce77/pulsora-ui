export const endpoints = {
  signup: "/dev/signup",
  login: "/dev/login",
  watchlist: "/watchlist",
  signal: (ticker: string) => `/signal/${ticker}`,
  sentiment: (ticker: string) => `/sentiment/${ticker}`,
};
