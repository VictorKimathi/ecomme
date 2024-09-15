import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from localStorage or server
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <Container>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>You have no past orders.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-item">
            <h4>Order #{order.confirmationNum}</h4>
            <p>
              <strong>Date:</strong> {new Date(order.date).toDateString()}
            </p>
            <p>
              <strong>Total:</strong> ${order.totalPrice}
            </p>
            <h5>Items:</h5>
            <ul>
              {order.cartList.map((item, idx) => (
                <li key={idx}>
                  {item.productName} - ${item.price} x {item.qty}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </Container>
  );
};

export default OrderHistory;
