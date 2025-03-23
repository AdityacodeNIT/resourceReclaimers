import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import UserContext from "../../context/UserContext";

const Product = () => {
  const {
    buyingProduct,
    addToFavourite,
    handleDisplay,
    handleAddToCart,
    notification,
    data,
    review,
    setReview,
    setProductId,
    handleFormClick,
    averageRatings = 0,
    totalRatings = 0,
  } = useContext(UserContext);

  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (data?._id) {
      setProductId(data._id);
    }
  }, [data, setProductId]);

  const product = data?.productId || data || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormClick();
  };

  return (
    <div key={product._id} className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      {/* Product Name */}
      <div className="w-full text-green-400 text-3xl md:text-4xl font-extrabold bg-gray-800 p-4 rounded-lg text-center shadow-md">
        {product.name}
      </div>

      {/* Product Section */}
      <div className="p-6 mt-6 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={product.imgLink || product.ProductImage || "/placeholder.png"}
            alt={product.name}
            className="shadow-lg bg-gray-700 w-96 h-96 rounded-lg transition-transform transform hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 space-y-6 text-center lg:text-left">
          <div className="text-3xl font-extrabold">{product.name}</div>

          {/* Wishlist Button */}
          <button
            className="text-lg flex items-center justify-center lg:justify-start gap-2 text-red-500 font-semibold hover:text-red-600 transition"
            onClick={() => addToFavourite(product._id)}
          >
            <FaHeart className="text-2xl" />
            <span>Add to Wishlist</span>
          </button>

          {/* Ratings */}
          <div className="text-2xl flex justify-center lg:justify-start gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i + 1 <= averageRatings ? "text-yellow-400" : "text-gray-500"} />
            ))}
            <span className="text-sm ml-2 text-gray-300">({Math.round(averageRatings * 100) / 100})</span>
          </div>

          {/* Price */}
          <div className="text-xl font-semibold">
            Price: <span className="text-green-400">₹{product.price}</span>
          </div>

          {/* Add to Cart & Buy Now Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="flex items-center justify-center gap-2 text-lg text-white bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-md shadow-md transition-transform transform hover:scale-105"
              onClick={() => handleAddToCart(product._id)}
            >
              <FaShoppingCart />
              Add to Cart
            </button>

            <Link to="/BuyProduct">
              <button
                className="flex items-center justify-center gap-2 text-lg text-white bg-violet-600 hover:bg-violet-700 px-8 py-3 rounded-md shadow-md transition-transform transform hover:scale-105"
                onClick={() => buyingProduct(product, product._id?.toString())}
              >
                Buy Now
              </button>
            </Link>
          </div>

          {/* Notification */}
          {notification && (
            <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg animate-bounce">
              {notification}
            </div>
          )}
        </div>
      </div>

      {/* Product Description */}
      <div className="shadow-lg h-auto bg-gray-800 mx-4 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-white">Description:</h2>
        <p className="text-lg text-gray-300 leading-relaxed">{product.description}</p>

        {/* Show More / Less */}
        <button
          className="text-lg text-blue-400 font-semibold mt-4"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "See Less" : "See More"}
        </button>

        {/* Additional Details */}
        {showMore && (
          <div className="text-gray-400 font-medium space-y-2 mt-4">
            {product.weight&&<div>Weight: {product.weight} g</div>}
           {product.height&& <div>Height: {product.height} cm</div>}
            {product.length&&<div>Length: {product.length} cm</div>}
            {product.width&&<div>Width: {product.width} cm</div>}
            {}
          </div>
        )}
      </div>

      {/* Product Reviews */}
      <div className="m-4 text-2xl font-semibold text-center text-white">
        Product Reviews
        <div className="flex flex-col md:flex-row justify-between items-center mx-4 space-y-6 md:space-y-0">
          {/* Review Summary */}
          <div className="text-lg font-semibold text-gray-300">
            <p>Total Reviews</p>
            <div>{totalRatings}</div>
          </div>

          {/* Average Rating */}
          <div className="text-lg font-semibold text-gray-300">
            <p>Average Rating</p>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i + 1 <= averageRatings ? "text-yellow-400" : "text-gray-500"} />
            ))}
            <button onClick={handleDisplay} className="ml-2">
              {Math.round(averageRatings * 100) / 100}
            </button>
          </div>

          {/* Review Form */}
          <div className="w-full md:w-1/2 p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`border-2 p-2 rounded-md transition duration-200 ${
                      review.rating === value ? "bg-yellow-400" : "hover:bg-gray-700"
                    }`}
                    onClick={() => setReview({ ...review, rating: value })}
                  >
                    {value}
                  </button>
                ))}
              </div>

              <textarea
                className="w-full p-3 border-2 rounded-md resize-none bg-gray-700 text-white"
                placeholder="Write your review..."
                value={review.description}
                onChange={(e) => setReview({ ...review, description: e.target.value })}
              ></textarea>

              <button className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
