import styled from "styled-components";
import { Router, Link } from "@reach/router";
import "./App.css";
import { Heading, Box, Grommet, DataTable, Text, Meter, Button } from "grommet";
import Badge from "./Badge";
import Explorer from "./Explorer";
import Fund from "./Fund";

function App() {
  return (
    <Router>
      <Explorer path="/" />
      <Fund path="fund" />
    </Router>
  );
}

export default App;
