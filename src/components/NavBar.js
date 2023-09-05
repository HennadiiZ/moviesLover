import Search from './Search';
import Logo from './Logo';
import NumberResults from './NumberResults';

export default function NavBar({ children }) {
  console.log(children[2].props);
  return (
    // <nav className='nav-bar'>
    //   <Logo />
    //   <Search />
    //   <NumberResults movies={movies} />
    // </nav>

    <nav className='nav-bar'>{children}</nav>
  );
}
