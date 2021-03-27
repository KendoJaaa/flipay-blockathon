import { useState } from "react";
import styled from "styled-components";
import {
  Heading,
  Button,
  Layer,
  DataTable,
  Text,
  TextInput,
  Form,
  FormField,
  Box,
} from "grommet";

import { Down } from "grommet-icons";

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

const Row = styled.div`
  display: flex;
  justify-content: center;
`;

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: gray;
  margin: 20px;
`;

const Body = styled.div``;

const Modal = styled.div`
  margin: 50px;
  margin-top: 20px;
`;

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
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >
          <Modal>
            <Heading level={3} textAlign="center">
              Buy Fund
            </Heading>
            <Form
              value={giveValue}
              onChange={(nextValue) => setGiveValue(nextValue)}
              onSubmit={({ value }) => {}}
            >
              <FormField
                name="name"
                htmlFor="text-input-id"
                label="BUSD Amount"
              >
                <TextInput
                  id="text-input-id"
                  name="giveAmount"
                  textAlign="end"
                />
              </FormField>
              <Row>
                <Circle>
                  <Down color="plain" size="medium" />
                </Circle>
              </Row>
              <FormField
                name="name"
                htmlFor="text-input-id"
                label="Growth Fund Token"
              >
                <TextInput
                  id="text-input-id"
                  name="takeAmount"
                  disabled
                  textAlign="end"
                />
              </FormField>
              <Box direction="row" gap="large" margin="large">
                <Button type="submit" primary label="Submit" />
                <Button
                  type="cancel"
                  label="Cancel"
                  onClick={() => setShow(false)}
                />
              </Box>
            </Form>
          </Modal>
        </Layer>
      )}
    </Page>
  );
}

export default Fund;
