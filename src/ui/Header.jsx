import { Link } from 'react-router';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';
import { useSelector } from 'react-redux';

function Header() {
  const username = useSelector((state) => state.user.username);
  return (
    <header className="flex items-center justify-between border-b border-stone-500 bg-yellow-400 px-6 py-3 uppercase max-sm:px-4">
      <Link to="/" className="tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      {username && <Username />}
    </header>
  );
}

export default Header;
