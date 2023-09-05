export default function NavBar({ children }) {
  console.log(children[2].props);
  return <nav className='nav-bar'>{children}</nav>;
}
