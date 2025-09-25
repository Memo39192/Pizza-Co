import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, redirect, useActionData, useNavigation } from 'react-router';
import { createOrder } from '../../services/apiRestaurant';
import store from '../../store';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { clearCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import { fetchAddress } from '../user/userSlice';

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const { username, status, address, position, error } = useSelector(
    (state) => state.user,
  );
  const cart = useSelector((state) => state.cart.cart);
  const totalCartPrice = useSelector(getTotalCartPrice);

  const [withPriority, setWithPriority] = useState(false);
  const [addressValue, setAddressValue] = useState(address);

  const dispatch = useDispatch();
  const formErrors = useActionData();
  const isSubmitting = useNavigation().state === 'submitting';

  const priority = withPriority ? totalCartPrice * 0.2 : 0;
  const totalCart = totalCartPrice + priority;

  async function handleGetPosition(e) {
    e.preventDefault();
    if (!address) {
      const payload = await dispatch(fetchAddress()).unwrap();
      setAddressValue(payload.address);
    } else setAddressValue(address);
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method="POST">
        <div className="mb-5 flex items-center gap-2 max-sm:flex-col max-sm:items-start">
          <label className="sm:basis-40">First Name</label>
          <div className="grow max-sm:w-full">
            <input
              type="text"
              name="customer"
              required
              className="input capitalize"
              defaultValue={username}
            />
          </div>
        </div>

        <div
          className={`flex items-center gap-2 max-sm:flex-col max-sm:items-start ${formErrors?.phone ? 'mb-16' : 'mb-5'}`}
        >
          <label className="sm:basis-40">Phone number</label>
          <div className="relative grow max-sm:w-full">
            <input type="tel" name="phone" required className="input" />
            {formErrors?.phone && (
              <p className="absolute top-full mt-2 w-full rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div
          className={`flex items-center gap-2 max-sm:flex-col max-sm:items-start ${status === 'error' ? 'mb-21' : 'mb-10'}`}
        >
          <label className="sm:basis-40">Address</label>
          <div className="relative grow max-sm:w-full">
            <input
              type="text"
              name="address"
              required
              className="input"
              value={
                status === 'loading' ? 'Getting location...' : addressValue
              }
              onChange={(e) => setAddressValue(e.target.value)}
            />
            {!addressValue && (
              <span className="absolute top-[50%] right-[1%] z-10 -translate-y-[50%]">
                <Button
                  type="small"
                  onClick={handleGetPosition}
                  disabled={status === 'loading'}
                >
                  Get Position
                </Button>
              </span>
            )}

            {status === 'error' && (
              <p className="absolute top-full mt-2 w-full rounded-md bg-red-100 p-2 text-xs text-red-700">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <input type="hidden" value={JSON.stringify(cart)} name="cart" />
        <input
          type="hidden"
          value={
            position.longitude && position.latitude
              ? `Longitude:${position.longitude} Latitude:${position.latitude}`
              : ''
          }
          name="position"
        />

        <Button type="primary" disabled={isSubmitting || status === 'loading'}>
          {isSubmitting
            ? 'Placing order....'
            : `order now from ${formatCurrency(totalCart)}`}
        </Button>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const errors = {};
  if (!isValidPhone(data.phone)) {
    errors.phone = 'Please enter a valid number.';
  }

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = {
    ...data,
    priority: data.priority ? true : false,
    cart: JSON.parse(data.cart),
  };

  const res = await createOrder(newOrder);

  store.dispatch(clearCart());

  return redirect(`/order/${res.id}`);
}

export default CreateOrder;
