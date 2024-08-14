import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Rating from "./Rating";
import { CartState } from "../context/Context";
const ProductCard = ({
  id,
  name,
  price,
  image,
  inStock,
  fastDelivery,
  ratings,
}) => {
  const [rate, setRate] = useState(5);

  const {
    state: { cart },
    dispatch,
  } = CartState();
  const handleAddToCart = () => {
    const product = { id, name, price, image, inStock, fastDelivery, ratings };
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  const handleRemoveFromCart = () => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  };
  return (
    <Card className="my-2 ">
      <Card.Img
        style={{ objectFit: "cover", height: "200px" }} // Adjust height as needed
        variant="top"
        src={image}
        alt={name}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          Price: ${price}
          <br />
          In Stock: {inStock}
          <br />
          Fast Delivery: {fastDelivery ? "Yes" : "No"}
          <br />
        </Card.Text>
        <Rating rate={ratings} onClick={(i) => setRate(i + 1)} />
        {/* this is check cart items if item exists then show remove else add to cart*/}
        {cart.some((p) => p.id === id) ? (
          <Button
            className="m-1"
            variant="danger"
            onClick={handleRemoveFromCart}>
            Remove from Cart
          </Button>
        ) : (
          <Button
            variant="primary"
            disabled={!inStock}
            onClick={handleAddToCart}>
            {inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
