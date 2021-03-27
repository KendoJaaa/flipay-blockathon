import { useState } from "react";
import styled from "styled-components";
import { Heading, DataTable, Layer, Text, Button } from "grommet";
import TradeModal from "./TradeModal";

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
                <Button primary onClick={() => setShow2(true)}>
                  Farm
                </Button>
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
      {show2 && (
        <Layer
          onEsc={() => setShow2(false)}
          onClickOutside={() => setShow2(false)}
        >
          <Button label="close" onClick={() => setShow2(false)} />
        </Layer>
      )}
    </div>
  );
}

export default FundManagement;
