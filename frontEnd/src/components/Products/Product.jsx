import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import UserContext from "../../context/UserContext";
import axios from "axios";

const Product = () => {
  const {
    buyingProduct,
    handleDisplay,
    handleAddToCart,
    notification,
    currentPage,
    totalPages,
    setCurrentPage,
    currentReviews,
    setGotReview,
    data,
    review,
    setReview,
    setProductId,
    handleFormClick,
    averageRatings = 0,
    totalRatings = 0,
  } = useContext(UserContext);

  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data?._id) {
      setProductId(data._id);
    }
  }, [data, setProductId]);

  const product = data?.productId || data || {};


  useEffect(() => {
    if (!data?._id) return;
    console.log(currentReviews);
    const controller = new AbortController();
    const signal = controller.signal;
  
    setGotReview([]);   
    setIsLoading(true);
    setCurrentPage(1);
  
  
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/v2/feedback/getReview/${data._id}`,
        { signal }
      )
      .then((res) => {
        console.log("REVIEW DATA", res.data);
        setGotReview(res.data);
    })
      .catch((err) => {
        if (err.name !== "CanceledError") console.error(err);
        else console.log("Previous request canceled");
      })
      .finally(() => setIsLoading(false));
  
    return () => {
      // runs when book._id changes or component unmounts
      controller.abort();
    };
  }, [data?._id]);
  



  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormClick();

  
  };

  return (
    <div key={product._id} className="min-h-screen bg-gradient-to-br from-gray-100 to-white text-black p-8">
  
      <div className="p-6 mt-6 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={product.imgLink || product.ProductImage || "/placeholder.png"}
            alt={product.name}
            className="shadow-lg bg-gray-300 w-96 h-96 rounded-lg transition-transform transform hover:scale-105"
          />
        </div>

        <div className="w-full md:w-1/2 space-y-6 text-center lg:text-left">
          <div className="text-3xl font-extrabold">{product.name}</div>

          <div className="text-2xl flex justify-center lg:justify-start gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i + 1 <= averageRatings ? "text-yellow-400" : "text-gray-500"} />
            ))}
            <span className="text-sm ml-2 text-gray-800">({Math.round(averageRatings * 100) / 100})</span>
          </div>

          <div className="text-xl font-semibold">
            Price: <span className="text-green-400">₹{product.price}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="flex items-center justify-center gap-2 text-lg text-black bg-blue-400 hover:bg-blue-700 px-8 py-3 rounded-md shadow-md transition-transform transform hover:scale-105"
              onClick={() => handleAddToCart(product._id)}
            >
              <FaShoppingCart />
              Add to Cart
            </button>

            <Link to="/BuyProduct">
              <button
                className="flex items-center justify-center gap-2 text-lg text-black bg-blue-400 hover:bg-violet-700 px-8 py-3 rounded-md shadow-md transition-transform transform hover:scale-105"
                onClick={() => buyingProduct(product, product._id?.toString())}
              >
                Buy Now
              </button>
            </Link>
          </div>

          {notification && (
            <div className="fixed bottom-4 right-4 bg-green-500 text-black px-6 py-3 rounded-md shadow-lg animate-bounce">
              {notification}
            </div>
          )}
        </div>
      </div>

      <div className="shadow-lg h-auto bg-gray-200 mx-4 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-black">Description:</h2>
        <p className="text-lg text-gray-800 leading-relaxed">{product.description}</p>

        <button
          className="text-lg text-blue-700 font-semibold mt-4"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "See Less" : "See More"}
        </button>

        {showMore && (
          <div className="text-gray-800 font-medium space-y-2 mt-4">
            {product.weight&&<div>Weight: {product.weight} g</div>}
           {product.height&& <div>Height: {product.height} cm</div>}
            {product.length&&<div>Length: {product.length} cm</div>}
            {product.width&&<div>Width: {product.width} cm</div>}
            {}
          </div>
        )}
      </div>

      <div className="m-4 text-2xl font-semibold text-center text-black">
        Product Reviews
        <div className="flex flex-col md:flex-row justify-between items-center mx-4 space-y-6 md:space-y-0">
          {/* Review Summary */}
          <div className="text-lg font-semibold text-gray-600">
            <p>Total Reviews</p>
            <div>{totalRatings}</div>
          </div>

          <div className="text-lg font-semibold text-gray-600">
            <p>Average Rating</p>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i + 1 <= averageRatings ? "text-yellow-400" : "text-gray-500"} />
            ))}
            <button onClick={handleDisplay} className="ml-2">
              {Math.round(averageRatings * 100) / 100}
            </button>
          </div>

          <div className="w-full md:w-1/2 p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`border-2 p-2 rounded-md transition duration-200 ${
                      review.rating === value ? "bg-yellow-400" : "hover:bg-gray-500"
                    }`}
                    onClick={() => setReview({ ...review, rating: value })}
                  >
                    {value}
                  </button>
                ))}
              </div>

              <textarea
                className="w-full p-3 border-2 rounded-md resize-none bg-gray-200 text-black"
                placeholder="Write your review..."
                value={review.description}
                onChange={(e) => setReview({ ...review, description: e.target.value })}
              ></textarea>

              <button className="w-full p-3 bg-blue-500 text-black rounded-md hover:bg-blue-600 transition duration-200">
                Submit Review
              </button>
            </form>
          </div>

        </div>
        
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">Reviews</h3>
      {isLoading ? (
        <div className="text-gray-600 text-center mt-4">Loading reviews...</div>
      ) : currentReviews?.length ? (
        <div className="space-y-4">
         
          {currentReviews.map((rev, i) => (

            
            <div key={i} className="bg-gray-100 rounded-lg shadow p-4 text-gray-800">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span className="font-medium">{rev?.userId?.fullName || "Anonymous"}</span>
                <span>{new Date(rev.createdAt).toLocaleString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}</span>
              </div>
              <div className="flex mt-2">
                {[...Array(rev.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 mr-1" />
                ))}
              </div>
              <p className="mt-2">{rev.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-600 text-center mt-4">No reviews yet.</div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            ⬅ Previous
          </button>

          <span className="text-gray-800 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            Next ➡
          </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default Product;
