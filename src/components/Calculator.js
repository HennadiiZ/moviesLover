import { useEffect, useState } from 'react';

export default function Calculator() {
  const [firstInput, setFirstInput] = useState('USD');
  const [secondInput, setSecondInput] = useState('EUR');
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);

  useEffect(() => {
    if (!amount) return;

    const controller = new AbortController();

    fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${firstInput}&to=${secondInput}`,
      { signal: controller.signal }
    )
      .then((res) => res.json())
      .then((res) => {
        setResult(res.rates?.[secondInput]);
      })
      .catch((err) => console.log(err.message));

    console.log(typeof amount);

    return function () {
      controller.abort();
    };
  }, [amount, firstInput, secondInput]);

  return (
    <div>
      <input
        type='number'
        value={+amount}
        onChange={(e) => setAmount(+e.target.value)}
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

//-------
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

// import { useEffect, useState } from "react";

// export default function App() {
//   const [amount, setAmount] = useState(1);
//   const [fromCur, setFromCur] = useState("EUR");
//   const [toCur, setToCur] = useState("USD");
//   const [converted, setConverted] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(
//     function () {
//       async function convert() {
//         setIsLoading(true);
//         const res = await fetch(
//           `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
//         );
//         const data = await res.json();
//         setConverted(data.rates[toCur]);
//         setIsLoading(false);
//       }

//       if (fromCur === toCur) return setConverted(amount);
//       convert();
//     },
//     [amount, fromCur, toCur]
//   );

//   return (
//     <div>
//       <input
//         type="text"
//         value={amount}
//         onChange={(e) => setAmount(Number(e.target.value))}
//         disabled={isLoading}
//       />
//       <select
//         value={fromCur}
//         onChange={(e) => setFromCur(e.target.value)}
//         disabled={isLoading}
//       >
//         <option value="USD">USD</option>
//         <option value="EUR">EUR</option>
//         <option value="CAD">CAD</option>
//         <option value="INR">INR</option>
//       </select>
//       <select
//         value={toCur}
//         onChange={(e) => setToCur(e.target.value)}
//         disabled={isLoading}
//       >
//         <option value="USD">USD</option>
//         <option value="EUR">EUR</option>
//         <option value="CAD">CAD</option>
//         <option value="INR">INR</option>
//       </select>
//       <p>
//         {converted} {toCur}
//       </p>
//     </div>
//   );
// }
