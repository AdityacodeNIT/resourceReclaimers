import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import { FaHeartBroken } from "react-icons/fa";

const Wishlisted = () => {
  const { myWishlist, childToParent, removeFromWishlist } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <h2 className="text-3xl font-bold text-center mb-6">💖 My Wishlist</h2>

      {myWishlist && myWishlist.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {myWishlist.map((order) =>
            order.items.map((item) => (
              <div
                key={item._id}
                className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
              >
                <Link to="/About" onClick={() => childToParent(item)}>
                  <div className="relative overflow-hidden h-56 bg-gray-700 rounded-t-lg flex items-center justify-center">
                    <img
                      src={item.productId.ProductImage}
                      alt={item.productId.name}
                      className="w-4/5 h-auto transition-transform duration-500 ease-in-out transform hover:scale-110 object-contain"
                    />
                  </div>
                </Link>

                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-white truncate">
                    {item.productId.name}
                  </h3>
                  <p className="text-yellow-400 font-bold text-lg mt-2">
                    ₹{item.productId.price}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Quantity: {item.quantity}
                  </p>

                  {/* Fix: Log ID and Remove */}
                  <button
                    onClick={() => {
                      console.log("Removing item with ID:", item._id);
                      removeFromWishlist(item._id);
                    }}
                    className="mt-4 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md shadow-md transition-transform transform hover:scale-105"
                  >
                    <FaHeartBroken />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-12">
          <p className="text-gray-400 text-lg">Your wishlist is empty.</p>
          <Link
            to="/shop"
            className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlisted;
