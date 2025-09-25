import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { formatCurrency } from '../../utils/helpers';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  return (
    totalCartQuantity !== 0 && (
      <div className="flex items-center justify-between bg-stone-800 px-6 text-stone-200 uppercase max-md:text-sm max-sm:p-4">
        <p className="space-x-6 font-semibold text-stone-300 max-sm:space-x-4">
          <span>{totalCartQuantity} pizzas</span>
          <span>{formatCurrency(totalCartPrice)}</span>
        </p>
        <Link to="/cart">Open cart &rarr;</Link>
      </div>
    )
  );
}

export default CartOverview;
