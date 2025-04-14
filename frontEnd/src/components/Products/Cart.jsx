import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    data,
    addToCart,
    removingElements,
    totalCartPrice,
    cartDesccription,
    childToParent,
  } = useContext(UserContext);

  return (
    <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-green-100 animate-fade-in min-h-screen p-4 md:p-8">
      <h2 className="text-center text-4xl md:text-5xl font-bold text-indigo-800 mb-10 drop-shadow-lg">
        🛒 Your Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full mt-20">
          <FontAwesomeIcon icon={faShoppingCart} className="text-indigo-300 text-9xl mb-6 animate-bounce" />
          <p className="text-2xl font-light text-indigo-500">Your cart is empty</p>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl">
          <h4 className="text-lg font-semibold text-indigo-700 mb-6">
            Items in Your Cart: {cartItems.length}
          </h4>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Cart Items */}
            <div className="flex-1 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => childToParent(item)}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-indigo-200 rounded-xl p-4 shadow-md hover:shadow-xl transition duration-300"
                >
                  <Link to="/About" className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={item.imgLink || item.ProductImage}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <div className="font-semibold text-indigo-800 text-xl">{item.name}</div>
                      <div className="text-lg text-indigo-600 mt-1">₹{item.price}</div>
                    </div>
                  </Link>

                  <div className="flex items-center justify-center sm:justify-end gap-4">
                    <button
                      className="text-indigo-600 hover:text-indigo-800 transition"
                      onClick={() => removingElements(item._id)}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className="text-lg font-medium">{item.quantity}</span>
                    <button
                      className="text-indigo-600 hover:text-indigo-800 transition"
                      onClick={() => addToCart(data, item._id)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 transition"
                      onClick={() => removeFromCart(item._id.toString())}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bill Summary */}
            <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-2xl text-center font-bold text-indigo-800 mb-6">
                💳 Bill Summary
              </h3>
              <div className="text-base text-gray-700 mb-4">{cartDesccription()}</div>

              <div className="space-y-4 text-lg">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalCartPrice()}</span>
                </div>
                <div className="flex justify-between border-t pt-2 border-indigo-200">
                  <span>Tax (18%)</span>
                  <span>₹{Math.ceil(totalCartPrice() * 0.18)}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2 border-indigo-300">
                  <span>Total</span>
                  <span>
                    ₹{Math.ceil(totalCartPrice() * 0.18 + totalCartPrice())}
                  </span>
                </div>
              </div>

              <Link to="/payments">
                <button
                  type="button"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 text-white py-3 mt-6 rounded-xl text-lg font-bold shadow-md hover:shadow-xl"
                >
                  Pay Now 💸
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
