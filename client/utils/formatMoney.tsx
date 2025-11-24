import currency from "currency.js";

const formatMoney = (amount: number) => {
  const symbol = "frs cfa";

  return currency(amount, {
    symbol,
    precision: 2,
    separator: ",",
    decimal: ".",
  }).format();
};

export default formatMoney;
