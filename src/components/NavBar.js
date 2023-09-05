import Search from './Search';
import Logo from './Search';
import NumberResults from './NumberResults';

export default function NavBar({ movies }) {
  return (
    <nav className='nav-bar'>
      {/* <Logo /> */}
      <Search />
      <NumberResults movies={movies} />
    </nav>
  );
}
