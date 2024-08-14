import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Container fluid style={{ padding: "1px 20px" }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
