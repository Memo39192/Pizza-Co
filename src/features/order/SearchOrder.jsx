import { useState } from 'react';
import { useNavigate } from 'react-router';

function SearchOrder() {
  const [query, setQuery] = useState('');
  const nav = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    nav(`/order/${query}`);
    setQuery('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-64 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:w-72 focus:ring-[3px] focus:ring-yellow-500/50 focus:outline-none max-sm:w-32 max-sm:px-3 max-sm:py-1.5 max-sm:text-[12px] max-sm:focus:w-32"
      />
    </form>
  );
}

export default SearchOrder;
