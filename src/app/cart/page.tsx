"use client";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { removeFromCart, updateQuantity } from "../../store/cartSlice";

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-4"
            >
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: Number.parseInt(e.target.value),
                      })
                    )
                  }
                  className="w-16 text-center border rounded-md"
                />
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h2>
          </div>
        </>
      )}
    </div>
  );
}
