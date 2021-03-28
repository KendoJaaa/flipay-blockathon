import { Router, Link } from "@reach/router";
import { useState } from "react";

import "./App.css";
import { Heading, Box, Grommet, DataTable, Text, Meter, Button } from "grommet";
import Badge from "./Badge";
import Explorer from "./Explorer";
import Fund from "./Fund";
import FundManager from "./FundManagement";
import FundManagerList from "./FundManagerList";
import Compound from "./Compound";
import WalletConnect from "./walletConnect";
import Util from "./Util";

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

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
      <Web3ReactProvider getLibrary={getLibrary}>
        <AppBar>
          <Button href="/" label="Pika Finance" />
          <p>
            <Button secondary onClick={onClickChangeRole}>
              <a href="fund-manager-list">Fund Manager</a>
            </Button>{" "}
            | <WalletConnect />
          </p>
        </AppBar>
        <Router>
          <Explorer path="/" />
          <Fund path="fund" />
          <FundManager path="fund-manager" />
          <FundManagerList path="fund-manager-list" />
          <Compound path="compound" />
          <Util path="util" />
        </Router>
      </Web3ReactProvider>
    </Grommet>
  );
}

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export default App;
