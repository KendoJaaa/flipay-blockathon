import { Router, Link } from "@reach/router";
import { useState } from "react";

import "./App.css";
import { Heading, Box, Grommet, DataTable, Text, Meter, Button } from "grommet";
import Badge from "./Badge";
import Explorer from "./Explorer";
import Fund from "./Fund";
import FundManager from "./FundManagement";

const AppBar = (props) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    style={{ zIndex: "1" }}
    {...props}
  />
);

function App() {
  const [isInvestor, setIsInvestor] = useState(true);

  const onClickChangeRole = () => {
    if (isInvestor) {
      window.location.href = "localhost:3000/fund-manager";
    } else {
      window.location.href = "localhost:3000";
    }
    setIsInvestor(!isInvestor);
  };

  return (
    <Grommet plain>
      <AppBar>
        Pika Finance
        <Button secondary onClick={onClickChangeRole}>
          <a href="fund-manager">Fund Manager</a>
        </Button>
      </AppBar>
      <Router>
        <Explorer path="/" />
        <Fund path="fund" />
        <FundManager path="fund-manager" />
      </Router>
    </Grommet>
  );
}

export default App;
