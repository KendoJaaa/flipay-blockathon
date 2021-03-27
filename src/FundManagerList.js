import { useState } from "react";
import styled from "styled-components";
import {
  Card,
  Layer,
  FormField,
  TextInput,
  Box,
  Button,
  Heading,
} from "grommet";

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 50px;
`;

function FundManagerList() {
  const [show, setShow] = useState(false);
  const [added, setAdded] = useState("");
  const [value, setValue] = useState("");
  return (
    <Page>
      <Heading>Asset Management</Heading>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <a href="fund-manager">
          <Card
            height="small"
            width="small"
            background="light-1"
            style={{ padding: "20px", cursor: "pointer" }}
          >
            <Heading level={2}>Growth Fund</Heading>
          </Card>
        </a>
        <div style={{ width: "20px" }}></div>
        {added != "" && (
          <a href="fund-manager">
            <Card
              height="small"
              width="small"
              background="light-1"
              style={{ padding: "20px", cursor: "pointer" }}
            >
              <Heading level={2}>{added}</Heading>
            </Card>
          </a>
        )}
        <div style={{ width: "20px" }}></div>
        <Card
          height="small"
          width="small"
          background="light-8"
          style={{ padding: "20px", cursor: "pointer" }}
          onClick={() => setShow(true)}
        >
          <Heading level={2}>+ Create Fund</Heading>
        </Card>
      </div>
      {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
          style={{ padding: "20px" }}
        >
          <FormField name="name" htmlFor="text-input-id" label="Fund Name">
            <TextInput
              id="text-input-id"
              name="name"
              onChange={(e) => setValue(e.target.value)}
            />
          </FormField>
          <Box direction="row" gap="medium">
            <Button
              type="submit"
              primary
              label="Submit"
              onClick={() => {
                setAdded(value);
                setShow(false);
              }}
            />
            <Button label="Cancel" onClick={() => setShow(false)} />
          </Box>
        </Layer>
      )}
    </Page>
  );
}

export default FundManagerList;
