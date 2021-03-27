import { useState } from "react";
import styled from "styled-components";
import { Heading, Button, DataTable, Text } from "grommet";

import TradeModal from "./TradeModal";

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
      <Header>
        <Heading>Growth Fund</Heading>
        <div>
          <StyledButton primary label="Buy" onClick={setShow} />
          <StyledButton primary label="Sell" />
        </div>
      </Header>
      <Body>
        <Heading level={2}>Fund Description</Heading>
        High Growth cryptocurrencies with good fundamental selected from Top 100
        cyptocurrencies by market cap
        <Heading level={2}>Asset Allocation</Heading>
        <DataTable
          columns={[
            {
              property: "asset",
              header: <Text>Asset</Text>,
              primary: true,
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
              asset: "Doge Coin",
              allocation: 60.4,
            },
            {
              asset: "Ripple",
              allocation: 19.6,
            },
            {
              asset: "Ethereum Classic",
              allocation: 10.0,
            },
          ]}
        />
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
