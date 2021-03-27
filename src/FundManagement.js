import { useState } from "react";
import styled from "styled-components";
import { Heading, DataTable, Box, Meter, Text, Button } from "grommet";
import TradeModal from "./TradeModal";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

function FundManagement() {
  const [show, setShow] = useState(false);
  const [giveValue, setGiveValue] = useState("");
  return (
    <div>
      <Heading>Asset Management</Heading>
      <DataTable
        columns={[
          {
            property: "name",
            header: <Text>Asset</Text>,
            primary: true,
          },
          {
            property: "percent",
            header: "Complete",
            render: (datum) => (
              <Row>
                <Button primary onClick={() => setShow(true)}>
                  Swap
                </Button>
                <Button primary>Farm</Button>
              </Row>
            ),
          },
        ]}
        data={[
          { name: "Bitcoin", percent: 20 },
          { name: "Ethereum", percent: 30 },
          { name: "Cake", percent: 40 },
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
    </div>
  );
}

export default FundManagement;
