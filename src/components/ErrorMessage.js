// export default function ErrorMessage({ err }) {
//   return <div className='error'>{err}</div>;
// }

export default function ErrorMessage({ message }) {
  return (
    <p className='error'>
      <span>⛔️</span> {message}
    </p>
  );
}
