import { useEffect, useState } from "react";

function App() {
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("inr");
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);

  const [currencyOptions, setCurrencyOptions] = useState({});

  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency}.json`
    )
      .then((res) => res.json())
      .then((res) => setCurrencyOptions(res[fromCurrency]));
  }, [fromCurrency]);

  const currencyList = Object.keys(currencyOptions);

  const swapCurrency = () => {
    const tempCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
  };

  function calc() {
    setToAmount(currencyOptions[toCurrency] * fromAmount);
  }

  return (
    <div className="maindiv">
      <div className="titlediv">
        <h1 className="title">Currency converter</h1>
      </div>
      <div className="formdiv">
        <form
          action=""
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            calc();
          }}
        >
          <div className="fromto">
            <div className="divfrom">
              <label htmlFor="">From</label>
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
              />
              <select
                name=""
                id=""
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {currencyList.map((currencyName) => (
                  <option key={currencyName} value={currencyName}>
                    {currencyName}
                  </option>
                ))}
              </select>
            </div>
            <div className="swapdiv">
              <button className="swapbtn" type="button" onClick={swapCurrency}>
                swap
              </button>
            </div>
            <div className="divto">
              <label htmlFor="">To</label>
              <input type="number" value={toAmount} disabled />
              <select
                name=""
                id=""
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {currencyList.map((currencyName) => (
                  <option key={currencyName} value={currencyName}>
                    {currencyName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="submitdiv">
            <button type="submit" className="submitbtn">
              Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
