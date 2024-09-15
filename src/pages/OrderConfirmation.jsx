import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const OrderConfirmation = () => {
  const location = useLocation();
  const { formData, confirmationNum, deliveryDate, cartList, totalPrice } =
    location.state || {};

  return (
    <Container>
      <h2>Order Confirmation</h2>
      <Row>
        <Col md={8}>
          <h4>Thank you, {formData.name}!</h4>
          <p>Your order has been placed successfully.</p>
          <p>
            <strong>Confirmation Number:</strong> {confirmationNum}
          </p>
          <p>
            <strong>Pickup/Delivery Date:</strong> {deliveryDate.toDateString()}
          </p>
          <h5>Order Summary:</h5>
          <ul>
            {cartList.map((item) => (
              <li key={item.id}>
                {item.productName} - ${item.price} x {item.qty}
              </li>
            ))}
          </ul>
          <h4>Total: ${totalPrice}</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderConfirmation;
