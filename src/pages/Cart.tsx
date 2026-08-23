import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } =
    useCart();
  if (items.length === 0) {
    <div>
      <p>No Items in Cart</p>
      <Link to={"/"}>Continue Sopping</Link>
    </div>;
  }
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Your Cart</h1>
      <div className="space-y-4">
        {items.map(({ product, quantity }) => (
          <div key={product.id}
          className="flex items-center gap-4 rounded-lg border p-8">
            <img src={product.image} alt={product.title} className="h-32 w-auto rounded object-cover"/>

            <div className="flex-1">
              <p className="font-medium">{product.title}</p>
              <p className="text-gray-600">{product.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQuantity(product.id, quantity - 1)} 
                 className="rounded border px-2">
                -
              </button>
              <p>{quantity}</p>
              <button onClick={() => updateQuantity(product.id, quantity + 1)}
                 className="rounded border px-2">
                +
              </button>
            </div>
            <p className="font-semibold">{(product.price * quantity).toFixed(2)}</p>
            <button onClick={() => removeFromCart(product.id)}
               className="text-red-500">Remove</button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <button onClick={clearCart} className="rounded bg-red-500 px-4 py-2 text-white">Clear Cart</button>
        <p className="text-xl font-bold">Total:${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Cart;