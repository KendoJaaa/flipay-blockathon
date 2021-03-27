import logo from "./logo.svg";
import styled from "styled-components";

import "./App.css";
import { Heading, Box, Grommet, DataTable, Text, Meter, Button } from "grommet";
import Badge from "./Badge";

const Page = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Padding = styled.div`
  height: 50px;
`;

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
    <Grommet plain>
      <AppBar>Pika Finance</AppBar>
      <Page>
        <Heading margin="none">Explore Fund</Heading>
        <Padding />
        <DataTable
          columns={[
            {
              property: "name",
              header: <Text>Name</Text>,
              primary: true,
            },
            {
              property: "marketCap",
              header: <Text>Market Cap</Text>,
            },
            {
              property: "dayChange",
              header: <Text>24h %</Text>,
              render: (datum) => <Badge value={datum.dayChange} />,
            },
            {
              property: "weekChange",
              header: <Text>7d %</Text>,
              render: (datum) => <Badge value={datum.weekChange} />,
            },
            {
              property: "percent",
              header: "Complete",
              render: (datum) => (
                <Box pad={{ vertical: "xsmall" }}>
                  <Meter
                    values={[{ value: datum.percent }]}
                    thickness="small"
                    size="small"
                  />
                </Box>
              ),
            },
            {
              property: "button",
              header: "Invest",
              render: (datum) => (
                <Box pad={{ vertical: "xsmall" }}>
                  <Button primary label="Invest" />
                </Box>
              ),
            },
          ]}
          data={[
            {
              name: "ABC Fund",
              marketCap: "$200,000",
              dayChange: 6,
              weekChange: 24,
              percent: 20,
            },
            {
              name: "XYZ Fund",
              marketCap: "$200,000",
              dayChange: -8,
              weekChange: -24,
              percent: 30,
            },
            {
              name: "Big Cap Fund",
              marketCap: "$200,000",
              dayChange: 6,
              weekChange: 4,
              percent: 40,
            },
            {
              name: "Defi Fund",
              marketCap: "$200,000",
              dayChange: 6,
              weekChange: -4,
              percent: 80,
            },
          ]}
        />
      </Page>
    </Grommet>
  );
}

export default App;
