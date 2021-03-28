import { useState } from "react";
import styled from "styled-components";
import { Heading, DataTable, Layer, Text, Button, Box } from "grommet";
import TradeModal from "./TradeModal";
import Bitcoin from "./img/Bitcoin.png";
import Ethereum from "./img/Ethereum.png";
import Cake from "./img/Cake.png";
import WBNB from "./img/WBNB.png";
const kak = {
  Bitcoin: Bitcoin,
  Ethereum: Ethereum,
  Cake: Cake,
  WBNB: WBNB,
};

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

function FarmModal() {}

function FundManagement() {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [giveValue, setGiveValue] = useState("");
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        margin: "50px",
      }}
    >
      <Heading>Growth Fund</Heading>
      <DataTable
        columns={[
          {
            property: "name",
            header: <Text>Asset</Text>,
            render: (data) => {
              return (
                <div style={{ display: "flex", alignItems: "Cente" }}>
                  {data.name}
                  <img
                    style={{ marginLeft: "5px" }}
                    src={kak[data.name]}
                    width={20}
                    height={20}
                  />
                </div>
              );
            },
          },
          {
            property: "amount",
            header: "Amount",
            render: (datum) => <div>{datum.amount}</div>,
          },
          {
            property: "percent",
            header: "Percent",
            render: (datum) => <div>{datum.percent} %</div>,
          },
          {
            property: "swap",
            header: "Swap",
            render: (datum) => (
              <Button primary onClick={() => setShow(true)} label="Swap" />
            ),
          },
          {
            property: "farm",
            header: "Farm",
            render: (datum) => (
              <Button primary onClick={() => setShow2(true)} label="Farm" />
            ),
          },
        ]}
        data={[
          { name: "Bitcoin", amount: "10.2342 BTC", percent: 43 },
          { name: "Ethereum", amount: "200.33 ETC", percent: 23 },
          { name: "Cake", amount: "2000.1 CAKE", percent: 13 },
          { name: "WBNB", amount: "1000 WBNB", percent: 11 },
        ]}
      />
      {show && (
        <TradeModal
          title="Swap Coin"
          onClose={() => setShow(false)}
          giveAsset="BUSC"
          takeAsset="Bitcoin"
          giveValue={giveValue}
          setGiveValue={setGiveValue}
        />
      )}
      {show2 && (
        <Layer
          onEsc={() => setShow2(false)}
          onClickOutside={() => setShow2(false)}
        >
          <DataTable
            columns={[
              {
                property: "name",
                header: <Text>Name</Text>,
                primary: true,
              },
              {
                property: "apy",
                header: <Text>APY</Text>,
                render: (datum) => <Text>{datum.apy}%</Text>,
              },
              {
                property: "percent",
                header: "Complete",
                render: (datum) => (
                  <Box pad={{ vertical: "xsmall" }}>
                    <Button primary label="Farm" />
                  </Box>
                ),
              },
            ]}
            data={[
              { name: "PancakeSwap", apy: 100, percent: 20 },
              { name: "Venus", apy: 80, percent: 30 },
              { name: "Autofarm", apy: 60, percent: 40 },
            ]}
          />
        </Layer>
      )}
    </div>
  );
}

export default FundManagement;
