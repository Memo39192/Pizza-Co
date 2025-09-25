import { Link } from 'react-router';

function Button({ children, disabled, to, type, onClick }) {
  const base =
    'inline-block text-sm rounded-full bg-yellow-400 font-semibold tracking-wide text-stone-800 uppercase transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed ';

  const styles = {
    primary: base + 'px-6 py-4 max-md:px-4 max-md:py-3',
    small: base + 'px-5 py-2.5 text-xs max-md:px-2 max-md:py-2',
    secondary:
      'inline-block text-sm rounded-full border-2 border-stone-300 px-5.5 py-3.5 font-semibold tracking-wide text-stone-400 uppercase transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:ring focus:ring-stone-200 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed max-md:px-3.5 max-md:py-2.5',
    round: base + 'px-3.5 py-2.5 text-sm max-md:px-2.5 max-md:py-1',
  };

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
