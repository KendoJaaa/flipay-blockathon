import styled from "styled-components";
import { Router, Link } from "@reach/router";
import "./App.css";
import { Heading, Box, Grommet, DataTable, Text, Meter, Button } from "grommet";
import Badge from "./Badge";
import Explorer from "./Explorer";
import Fund from "./Fund";

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
  return (
    <div>
      <AppBar>Pika Finance</AppBar>
      <Router>
        <Explorer path="/" />
        <Fund path="fund" />
      </Router>
    </div>
  );
}

export default App;
