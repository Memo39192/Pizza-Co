import { useSelector } from 'react-redux';

function Username() {
  const username = useSelector((state) => state.user.username);
  return <p className="text-sm font-semibold max-md:hidden">{username}</p>;
}

export default Username;
