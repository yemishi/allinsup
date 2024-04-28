const parseLocalCurrency = (e: number) =>
  e.toLocaleString("en-US", { style: "currency", currency: "USD" });

const parseToDate = (d: Date) => {
  const date = new Date(d);
  return `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`;
};

export { parseToDate, parseLocalCurrency };
