import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserContextProvider = ({ children }) => {
  // State to manage the selected product details.
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("product")) || null
  );

  // State to manage detailed information of a product.
  const [productDetails, setProductDetails] = useState();
  const getProductDetail = (detail) => {
    setProductDetails(detail);
  };




  const recordActivity = async (action, productId) => {
    try {
     
      if (!productId) return;
  
      await axios.post(`${import.meta.env.VITE_API_URL}/api/activity/record`, {
      
        action,
        productId,
      },
      {
        withCredentials:true,
      }
    );
  
    } catch (error) {
      console.error("Error recording user activity:", error);
    }
  };
  
  // Product Management: Handling selected product information with localStorage persistence.
  const childToParent = (product) => {
    setData(product);
    recordActivity("show",product._id);
  };

  // Save selected product to localStorage whenever there's a change in data state.
  useEffect(() => {
    localStorage.setItem("product", JSON.stringify(data));
  }, [data]);

  const [quantity, setQuantity] = useState(1);

  // State to manage items in the cart.
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  // Save cart items to localStorage whenever there's a change in cartItems state.
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Cart Management: Adding, removing, and updating cart items.
  const addToCart = (product, productId) => {
    let existingProduct = cartItems.find(
      (item) => item._id.toString() === productId
    );

    if (existingProduct) {
      // If product already exists in cart, increment its quantity.
      const updatedCartItems = cartItems.map((item) =>
        item._id.toString() === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      // If the product is not in the cart, add it with a quantity of 1.
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Reducing item quantity in the cart or removing it.
  const removingElements = (productId) => {
    const removingCartItems = cartItems.map((item) =>
      item.quantity >= 2 && item._id === productId
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(removingCartItems);
  };


  // Remove a specific item from the cart.
  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(
      (item) => item._id.toString() !== productId
    );
    setCartItems(updatedCartItems);
  };


  // Calculate the total price of all items in the cart.
  const totalCartPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };


  // State to manage address ID.
  const [addressId, setAddressId] = useState(() => {
    return localStorage.getItem("addressId") || undefined;
  });


  // Sync the state value to localStorage whenever it changes.
  useEffect(() => {
    if (addressId !== undefined) {
      localStorage.setItem("addressId", addressId);
    }
  }, [addressId]);


  // Generate a description of items in the cart.
  const cartDesccription = () => {
    return cartItems.map((item) => (
      <div key={item._id}>
        <div className=" flex bg-blue-100 p-2 font-semibold lg:text-xl text-sm">
          {item.name}
          <div className="ml-4 float-right">{item.price * item.quantity}</div>
        </div>
      </div>
    ));
  };

  // State to manage products marked for buying with localStorage persistence.
  const [buyProduct, setBuyProduct] = useState(
    JSON.parse(localStorage.getItem("buyProduct")) || []
  );

  // Save buyProduct to localStorage whenever there's a change in buyProduct state.
  useEffect(() => {
    localStorage.setItem("buyProduct", JSON.stringify(buyProduct));
  }, [buyProduct]);

  // Buying a product and adding it to the buyProduct state.
  const buyingProduct = (bought, boughtId) => {
    recordActivity("buy",boughtId);
    let existingitem = buyProduct.find(
      (item) => item._id.toString() === boughtId
    );
    if (existingitem) {
      const updateProduct = buyProduct.map((item) =>
        boughtId === item._id.toString()
          ? { ...item, addressId, quantity: item.quantity + 1 }
          : item
      );
      setBuyProduct(updateProduct);
    } else {
      setBuyProduct([...buyProduct, { ...bought, addressId, quantity: 1 }]);
    }
  };

  // Remove all items from checkout and cart.
  const removeItemfromCheckout = () => {
    setBuyProduct([]);
    setCartItems([]);
  };

  // Calculate the total price of all bought items.
  const totalProductPrice = () => {
    return buyProduct.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  // Generate product price list for all bought items.
  const totalPrice = (buyProduct) => {
    return buyProduct.map((product) => product.quantity * product.price);
  };

  // Generate product descriptions for bought items.
  const productDesccription = () => {
    return buyProduct.map((item) => (
      <div key={item._id}>
        <div className="border-1 border-slate-300 flex bg-blue-100 p-2 text-xl rounded-xl px-4">
          {item.name} x {item.quantity}
          <div className="ml-4">= {item.price * item.quantity}</div>
        </div>
      </div>
    ));
  };

  // Generate product names.
  const productName = () => {
    return buyProduct.map((item) => (
      <div className="border-1 border-slate-300 flex bg-blue-100 p-2 text-xl rounded-xl px-4">
        {item.name}
      </div>
    ));
  };

  // State to manage successful orders.
  const [orderSuccess, setOrderSuccess] = useState([]);
  useEffect(() => {
    localStorage.setItem("orderSuccess", JSON.stringify(orderSuccess));
  }, [orderSuccess]);

  // State to manage user details.
  const [userDetail, setUserDetail] = useState(
    JSON.parse(localStorage.getItem("details")) || null
  );
  const getUserDetail = async (details) => {
    if (details) {
      setUserDetail(details);
    } else {
      console.error("Invalid details passed to getUserDetail");
    }
  };

  // Save user details to localStorage whenever there's a change in userDetail state.
  useEffect(() => {
    localStorage.setItem("details", JSON.stringify(userDetail));
  }, [userDetail]);



 // State to manage user details.
 const [sellerDetail, setSellerDetail] = useState(
  JSON.parse(localStorage.getItem("sellerdetails")) || null
);
const getSellerDetail = async (selldetails) => {
  if (selldetails) {
    setSellerDetail(selldetails);
  } else {
    console.error("Invalid details passed to getUserDetail");
  }
};

// Save user details to localStorage whenever there's a change in userDetail state.
useEffect(() => {
  localStorage.setItem("sellerdetails", JSON.stringify(sellerDetail));
}, [sellerDetail]);












  // Notification management for adding items to the cart.
  const [notification, setNotification] = useState("");
  const handleAddToCart = () => {
    addToCart(data, data._id.toString());
    setNotification("Your item is added to the cart");

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  // Order Management: Creating an order from cart and buyProduct items.
  const [orderProduct, setOrderProduct] = useState({
    items: [],
  });

  // Update orderProduct state whenever buyProduct, cartItems, or addressId changes.
  useEffect(() => {
    setOrderProduct((prevOrderProduct) => ({
      ...prevOrderProduct,
      items: [
        ...buyProduct.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          Address_id: addressId,
        })),
        ...cartItems.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          Address_id: addressId,
        })),
      ],
    }));
  }, [buyProduct, cartItems, addressId]);

  // Handling successful order submission.
  const orderSuccessful = async () => {
 // Ensure payment was successful
      try {
        await handleFormSubmit();  // Call function to create order
        setOrderSuccess((prevOrders) => [...prevOrders, order]);
      } catch (error) {
        console.error("Error creating order after payment:", error);
      }
    
  };

  const [orderDetails, setOrderDetails] = useState(null);

  // Handling form submission to create an order.
  const handleFormSubmit = async () => {
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/shiprocket/order`,
        orderProduct,
        { withCredentials: true }
      );

      if (response) {
        setOrderDetails(response.data);
       
      }
    } catch (error) {
      console.error("Error placing the order:", error);
    }
  };

  // State to manage wishlist.
  const [wishlist, setWishlist] = useState(() => ({
    userId: userDetail?.data?.user?._id,
    items: [],
  }));

  // Add item to wishlist.
  const addToFavourite = async (itemId) => {
    const updatedWishlist = {
      ...wishlist,
      items: [...wishlist.items, { productId: itemId, quantity: 1 }],
    };

    setWishlist(updatedWishlist); // Update state first

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v2/wishlist/addWishlist`,
        updatedWishlist
      );
      if (response.data) {
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v2/wishlist/removeWishlistItem`,
        {productId},
        { withCredentials: true }

      );
     
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  };
  

  const [myWishlist, setMyWishlist] = useState([]);

  // Fetch wishlist items.
  const fetchFavourites = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v2/wishlist/Wishlists/${
          userDetail.data.user._id
        }`
      );
      if (response.data) {
        setMyWishlist(response.data);
      }
    } catch (error) {
      console.error("Error fetching favourites:", error);
      setWishlist({ userId: userDetail?.data?.user?._id, items: [] });
    }
  };

  

  

  // Fetch wishlist items whenever wishlist changes.
  useEffect(() => {
    if (userDetail?.data?.user?._id) {
      fetchFavourites();
    }
  }, [wishlist,removeFromWishlist]);




  // State to manage product reviews.
  const [review, setReview] = useState({ rating: 0, description: "" });
  const [productReview, setProductReview] = useState({});
  const [productId, setProductId] = useState(data?._id);
  const [totalRatings, setTotalRatings] = useState([]);
  const [averageRatings, setAverageRatings] = useState([]);

  // Handle form click for submitting a review.
  const handleFormClick = (e) => {
    setProductReview({ ...review, productId });
    setReview({ rating: 0, description: "" });
  };

  // Submit product review whenever productReview changes.
  useEffect(() => {
    if (productReview.rating && productReview.description) {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/api/v2/feedback/review`,
          productReview
        )
        .catch((error) => {
          console.error("There was an error posting the review!", error);
        });
    }
  }, [productReview]);


  

  // Fetch average ratings and total ratings for a product.
  useEffect(() => {
    setAverageRatings(0);
    setTotalRatings(0);
    if (productId) {
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/v2/feedback/average`, {
          productId,
        })
        .then((response) => {
          setAverageRatings(response.data.averageRating);
          setTotalRatings(response.data.count);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the average ratings!",
            error
          );
        });
    }
  }, [productId, productReview]);

  // State to manage search results.
  const [searchResult, setSearchResult] = useState([]);

  // Handle search query.
  const handleSearch = (query) => {
    setSearchResult(query.result);
  };

  // State to manage order items.
  const [orderItems, setOrderItems] = useState([]);

  // Fetch order details by order ID.
  const GetOrderId = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/shiprocket/getOrder/${id}`,
        { withCredentials: true }
      );
      if (response) {

        setOrderItems(response.data.data.data);
        console.log(response.data.data.data);
      }
    } catch (error) {
      console.error("Failed to register", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        setUserDetail,
        cartItems,
        addToCart,
        userDetail,
        getProductDetail,
        setQuantity,
        productDesccription,
        productDetails,
        buyingProduct,
        getUserDetail,
        GetOrderId,
        orderItems,
        data,
        childToParent,
        removeFromCart,
        quantity,
        removingElements,
        totalCartPrice,
        totalProductPrice,
        cartDesccription,
        removeItemfromCheckout,
        productName,
        totalPrice,
        buyProduct,
        orderSuccess,
        orderSuccessful,
        setOrderSuccess,
        handleAddToCart,
        notification,
        addToFavourite,
        wishlist,
        myWishlist,
        handleSearch,
        searchResult,
        orderDetails,
        review,
        setReview,
        productReview,
        setProductReview,
        productId,
        setProductId,
        handleFormClick,
        totalRatings,
        averageRatings,
        setAddressId,
        removeFromWishlist,
        sellerDetail,
        getSellerDetail
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;


