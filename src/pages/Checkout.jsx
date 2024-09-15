import { useSelector } from "react-redux";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // for redirecting after checkout

const Checkout = () => {
  const { cartList } = useSelector((state) => state.cart);
  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    creditCard: "",
    deliveryOption: "homeDelivery",
    storeLocation: "",
  });

  const [confirmationNumber, setConfirmationNumber] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const navigate = useNavigate();

  // Hardcoded store locations
  const storeLocations = [
    { name: "Store 1", zip: "12345" },
    { name: "Store 2", zip: "67890" },
    { name: "Store 3", zip: "11223" },
    { name: "Store 4", zip: "44556" },
    { name: "Store 5", zip: "78901" },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Generate confirmation number
        const confirmationNum = Math.floor(Math.random() * 100000000);
        setConfirmationNumber(confirmationNum);

        // Set delivery or pickup date (2 weeks after order date)
        const today = new Date();
        const deliveryDate = new Date(today.setDate(today.getDate() + 14));
        setDeliveryDate(deliveryDate);

        // Redirect to order confirmation page after submission
        navigate("/order-confirmation", {
        state: { formData, confirmationNum, deliveryDate, cartList, totalPrice },
        });
    };

  return (
    <section className="checkout">
      <Container>
        <h2>Checkout</h2>
        <Row>
          <Col md={8}>
            <h3>Shipping Information</h3>
            <Form onSubmit={handleSubmit}>
              {/* Personal Details */}
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              {/* Address */}
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              {/* Delivery Options */}
              <Form.Group>
                <Form.Label>Delivery Option</Form.Label>
                <Form.Check
                  type="radio"
                  label="Home Delivery"
                  name="deliveryOption"
                  value="homeDelivery"
                  checked={formData.deliveryOption === "homeDelivery"}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="radio"
                  label="In-store Pickup"
                  name="deliveryOption"
                  value="storePickup"
                  checked={formData.deliveryOption === "storePickup"}
                  onChange={handleInputChange}
                />
              </Form.Group>

              {/* Store Locations (Only show if storePickup is selected) */}
              {formData.deliveryOption === "storePickup" && (
                <Form.Group>
                  <Form.Label>Select Store Location</Form.Label>
                  <Form.Control
                    as="select"
                    name="storeLocation"
                    value={formData.storeLocation}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">--Select Store--</option>
                    {storeLocations.map((store, idx) => (
                      <option key={idx} value={store.zip}>
                        {store.name} - {store.zip}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              )}

              {/* Credit Card */}
              <Form.Group>
                <Form.Label>Credit Card</Form.Label>
                <Form.Control
                  type="text"
                  name="creditCard"
                  value={formData.creditCard}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              {/* Submit Order */}
              <Button type="submit" variant="success" className="mt-3">
                Place Order
              </Button>
            </Form>
          </Col>

          {/* Order Summary */}
          <Col md={4}>
            <h3>Order Summary</h3>
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
    </section>
  );
};

export default Checkout;
