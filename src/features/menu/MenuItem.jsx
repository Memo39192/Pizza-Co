import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';
import { addItem, getCurrentQuantityById } from '../cart/cartSlice';
import Button from '../../ui/Button';
import DeleteItem from '../cart/DeleteItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantityById = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantityById > 0;

  function handleClick() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: 1 * unitPrice,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`${soldOut ? 'opacity-70 grayscale' : ''} h-24 w-24`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-stone-500 capitalize italic">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium text-stone-500 uppercase">
              Sold out
            </p>
          )}
          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleClick}>
              Ad to cart
            </Button>
          )}
          {isInCart && (
            <div className="flex items-center gap-8 max-sm:gap-3">
              <UpdateItemQuantity
                id={id}
                currentQuantity={currentQuantityById}
              />
              <DeleteItem id={id} />
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
