import { useEffect, useRef } from 'react';

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null);
  console.log(inputEl);

  useEffect(() => {
    function callback(e) {
      if (document.activeElement === inputEl.current) {
        return;
      }

      if (e.code === 'Enter') {
        inputEl.current.focus();
        setQuery('');
      }
    }
    document.addEventListener('keydown', callback);
    // console.log(inputEl.current);
    return () => document.addEventListener('keydown', callback);
    // inputEl.current.focus();
  }, [setQuery]);

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

//====== 2
// import { useEffect, useRef } from 'react';

// export default function Search({ query, setQuery }) {
//   useEffect(() => {
//     const el = document.querySelector('.search');
//     console.log(el);
//     el.focus();
//   }, []);

//   return (
//     <input
//       className='search'
//       type='text'
//       placeholder='Search movies...'
//       value={query}
//       onChange={(e) => setQuery(e.target.value)}
//     />
//   );
// }

//====== 1
// import { useEffect } from 'react';

// export default function Search({ query, setQuery }) {
//   // const el = document.querySelector('.search');
//   // console.log(el);
//   // el?.focus();

//   useEffect(() => {
//     const el = document.querySelector('.search');
//     console.log(el);
//     el.focus();
//   }, []);

//   return (
//     <input
//       className='search'
//       type='text'
//       placeholder='Search movies...'
//       value={query}
//       onChange={(e) => setQuery(e.target.value)}
//     />
//   );
// }

//====== orig
// export default function Search({ query, setQuery }) {
//   return (
//     <input
//       className='search'
//       type='text'
//       placeholder='Search movies...'
//       value={query}
//       onChange={(e) => setQuery(e.target.value)}
//     />
//   );
// }
