import { useParams } from "react-router-dom";

const OrderSuccess = () => {
  const { orderId } = useParams();

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold">Order Successful!</h1>
      <p>Your order ID is {orderId}.</p>
    </div>
  );
};

export default OrderSuccess;