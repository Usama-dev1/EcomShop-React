import React, { useEffect, useState } from "react";
import { CartState } from "../context/Context";
import { MdDelete } from "react-icons/md";
import { FaArrowCircleLeft } from "react-icons/fa";
import { ListGroup,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const Cart = () => {
  const [total, setTotal] = useState();
  const {
    state: { cart },
    dispatch,
  } = CartState();
  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + Number(curr.price)*curr.qty, 0));
  }, [cart]);
 


  return (
    <>
      <div className="container">
        <Link to="/" className="btn btn-secondary my-2 py-2">
          <FaArrowCircleLeft /> Go back
        </Link>
        <div className="row">
          <div className="col-md-8">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <ListGroup key={item.id} className="mb-2">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <span className="me-2">{index + 1}.</span>
                    <span>
                      <img
                        src={item.image}
                        alt=""
                        height={60}
                        className="me-2 rounded-3 rounder-xl "
                      />
                    </span>
                    <span className="me-2">{item.name}</span>

                    <span className="me-2">PKR{item.price.split(".")[0]}</span>
                    <span>
                      <label >Quantity:</label>
                      <select
                        className="ms-2"
                        name="quantity"
                        value={item.qty}
                        id="quantity"
                        onChange={(e) =>
                          dispatch({
                            type: "QUANTITY_CART",
                            payload: { id: item.id, qty: e.target.value },
                          })
                        }>
                        {[...Array(item.inStock).keys()].map((x) => (
                          <option key={x + 1}>{x + 1}</option>
                        ))}
                      </select>
                    </span>
                    <span>
                      <MdDelete
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: { id: item.id },
                          })
                        }
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                  </ListGroup.Item>
                </ListGroup>
              ))
            ) : (
              <span className="px-5 fs-5">Cart is Empty</span>
            )}
          </div>
          <div className="col-md-4 bg-secondary pt-4 ">
            {" "}
            <div className="d-flex justify-content-between text-white bg-dark py-3">
              <div className="flex-fill text-center">
                <p className="mb-0 me-2">No.</p>
              </div>
              <div className="flex-fill text-center">
                <p className="mb-0 me-4">Name</p>
              </div>
              <div className="flex-fill text-center">
                <p className="mb-0 ms-5">Quantity</p>
              </div>
              <div className="flex-fill text-center">
                <p className="mb-0 me-3">Price</p>
              </div>
            </div>
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <ListGroup key={item.id} className="mb-2">
                  <ListGroup.Item className="d-flex border-0 justify-content-between align-items-center bg-secondary">
                    <span className="me-2 text-white">{index + 1}.</span>
                    <span className="me-2 text-white">{item.name}</span>
                    <span className="me-2 text-white">{item.qty}</span>
                    <span className="me-2 text-white">
                      PKR{item.price.split(".")[0]}
                    </span>
                  </ListGroup.Item>
                </ListGroup>
              ))
            ) : (
              <span className="px-5 fs-5">Nothing in Cart</span>
            )}
            <div className="text-center fs-4 mt-4 text-white">
              <div className="bg-dark border border-black"></div>
              <strong>Total: PKR{total}</strong>
            </div>
            <div className="text-center w-full py-1">
              <Button variant="dark" size="lg" className="w-100 fs-4">
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
