import React from "react"
import { CiShoppingCart } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import {
  Navbar,
  FormControl,
  Container,
  Nav,
  Dropdown,
  Badge,
  ListGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";

import { CartState } from "../context/Context";

const MainNavbar = () => {
  const {
    productDispatch,
    state: { cart },
    dispatch,
  } = CartState();
 
  return (
    <Navbar variant="dark" bg="dark" className="custom-navbar" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/" style={{ textDecoration: "none", color: "whitesmoke" }}>
            Shopping
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse className="d-flex justify-content-end">
          <FormControl
            className="mx-3"
            placeholder="Search a product"
            style={{ maxWidth: 250 }}
            onChange={
              (e)=>{
               productDispatch({
                 type: "FILTER_BY_SEARCH",
                 payload: e.target.value,
               });
              }
            }

          />
        </Navbar.Collapse>
        <Nav>
          <Dropdown align="end">
            <Dropdown.Toggle
              className="d-flex align-items-center bg-secondary border-0"
              id="dropdown-basic">
              <div className="d-flex align-items-center">
                <CiShoppingCart className="text-white" fontSize="25px" />
                <span className="absolute top-5">Cart</span>
              </div>
              <Badge disabled className="bg-secondary text-white">
                {cart.length}
              </Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ width: 370 }}>
              {cart.length > 0 ? (
                cart.map((item) => {
                  return (
                    <Dropdown.Menu
                    key={item.id}
                      style={{
                        width: 370,
                        padding: "10px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        maxHeight: "400px", // To handle overflow
                        overflowY: "auto", // To handle overflow
                      }}>
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
                              <span className="me-2">
                                PKR{item.price.split(".")[0]}
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
                      <div className="text-center">
                        <Link className="btn btn-secondary mx-auto" to="/cart">
                          Go to Cart <FaArrowCircleRight />
                        </Link>
                      </div>
                    </Dropdown.Menu>
                  );
                })
              ) : (
                <span className="px-5 fs-5"> Cart is Empty</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
