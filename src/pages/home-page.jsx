import React from "react";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        margin: "100px 0px",
      }}
    >
      <div>
        <Link to="/payment">
          <Button variant="gradient" gradient={{ from: "indigo", to: "cyan" }}>
            Payment
          </Button>
        </Link>
      </div>
      <div>
        <Link to="/vendor/home">
          <Button variant="gradient" gradient={{ from: "indigo", to: "cyan" }}>
            Vendor Dashboard
          </Button>
        </Link>
      </div>
      <div>
        <Link to="/apiconnect/home">
          <Button variant="gradient" gradient={{ from: "indigo", to: "cyan" }}>
            APAYConnect Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
