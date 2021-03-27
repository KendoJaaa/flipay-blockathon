import styled from "styled-components";
import "./App.css";
import {
  Heading,
  Box,
  Grommet,
  DataTable,
  Text,
  Meter,
  Button,
  Image,
} from "grommet";
import Badge from "./Badge";
import { Link } from "@reach/router";

const Page = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Img = styled.img`
  width: 100px;
  height: 20px;
`;

const Padding = styled.div`
  height: 50px;
`;

function Explorer() {
  return (
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
            property: "price",
            header: <Text>Price</Text>,
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
            property: "apy",
            header: "APY",
            render: (datum) => <Badge value={datum.apy}></Badge>,
          },
          {
            property: "button",
            header: "Invest",
            render: (datum) => (
              <Box pad={{ vertical: "xsmall" }}>
                <Link to="fund">
                  <Button primary label="Invest" />
                </Link>
              </Box>
            ),
          },
        ]}
        data={[
          {
            name: "Growth Fund",
            price: "$10.5",
            marketCap: "$200,000",
            dayChange: 6,
            weekChange: 24,
            percent: 20,
            img: "aa",
            apy: 150,
          },
          {
            name: "XYZ Fund",
            price: "$30.5",
            marketCap: "$200,000",
            dayChange: -8,
            weekChange: -24,
            percent: 30,
            img: "bb",
            apy: 150,
          },
          {
            name: "Big Cap Fund",
            price: "$40.5",
            marketCap: "$200,000",
            dayChange: 6,
            weekChange: 4,
            percent: 40,
            img: "cc",
            apy: 180,
          },
          {
            name: "Defi Fund",
            price: "$50.5",
            marketCap: "$200,000",
            dayChange: 6,
            weekChange: -4,
            percent: 80,
            img: "dd",
            apy: 200,
          },
        ]}
      />
    </Page>
  );
}

export default Explorer;
