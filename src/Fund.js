import { useState } from "react";
import styled from "styled-components";
import { Heading, Button, DataTable, Text, Image } from "grommet";
import Bitcoin from "./img/Bitcoin.png";
import Ethereum from "./img/Ethereum.png";
import Cake from "./img/Cake.png";
import graph from "./img/graph.png";
import pie from "./img/pie.png";
import TradeModal from "./TradeModal";

const kak = {
  Bitcoin: Bitcoin,
  Ethereum: Ethereum,
  Cake: Cake,
};

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 50px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Body = styled.div``;

const StyledButton = styled(Button)`
  margin-left: 20px;
`;

function Fund() {
  const [show, setShow] = useState();
  const [giveValue, setGiveValue] = useState("");

  return (
    <Page>
      <Body>
        <Header>
          <Heading level={2}>Growth Fund</Heading>
          <div>
            <StyledButton
              primary
              label="Buy"
              onClick={setShow}
              style={{ width: "150px" }}
            />
            <StyledButton primary label="Sell" style={{ width: "150px" }} />
          </div>
        </Header>
        Current Price
        <Heading style={{ marginTop: "10px", marginBottom: "10px" }}>
          $108.81
        </Heading>
        <Image src={graph} width={1000} style={{ marginTop: "20px" }} />
        <Heading level={2}>Fund Description</Heading>
        High Growth cryptocurrencies with good fundamental selected from Top 100
        cyptocurrencies by market cap
        <div
          style={{
            display: "flex",
            marginTop: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Heading level={2}>Asset Allocation</Heading>
            <DataTable
              columns={[
                {
                  property: "asset",
                  header: <Text>Asset</Text>,
                  render: (data) => {
                    return (
                      <div style={{ display: "flex", alignItems: "Cente" }}>
                        {data.asset}
                        <img
                          style={{ marginLeft: "5px" }}
                          src={kak[data.asset]}
                          width={20}
                          height={20}
                        />
                      </div>
                    );
                  },
                },
                {
                  property: "d",
                  header: <Text></Text>,
                },
                {
                  property: "d",
                  header: <Text></Text>,
                },
                {
                  property: "allocation",
                  header: <Text>Allocation</Text>,
                  render: (value) => {
                    return <div>{value.allocation} %</div>;
                  },
                },
              ]}
              data={[
                {
                  asset: "Bitcoin",
                  allocation: 60.4,
                },
                {
                  asset: "Ethereum",
                  allocation: 19.6,
                },
                {
                  asset: "Cake",
                  allocation: 10.0,
                },
              ]}
            />
          </div>
          <Image
            src={pie}
            width={275}
            height={200}
            style={{ marginTop: "20px" }}
          />
        </div>
      </Body>
      {show && (
        <TradeModal
          onClose={() => setShow(false)}
          giveValue={giveValue}
          setGiveValue={setGiveValue}
        />
      )}
    </Page>
  );
}

export default Fund;
