import { useEffect, useState } from 'react';

export default function Calculator() {
  const [firstInput, setFirstInput] = useState('USD');
  const [secondInput, setSecondInput] = useState('EUR');
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);

  // `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
  useEffect(() => {
    // if (!firstInput || !secondInput || !amount) return;
    if (!amount) return;

    fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${firstInput}&to=${secondInput}`
    )
      .then((res) => res.json())
      .then((res) => {
        setResult(res.rates?.[secondInput]);
      });
  }, [amount, result, firstInput, secondInput]);

  return (
    <div>
      <input
        type='text'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select
        onChange={(e) => setFirstInput(e.target.value)}
        defaultValue='USD'
      >
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <select
        onChange={(e) => setSecondInput(e.target.value)}
        defaultValue='EUR'
      >
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <p>OUTPUT: {firstInput === secondInput ? amount : result}</p>
    </div>
  );
}
