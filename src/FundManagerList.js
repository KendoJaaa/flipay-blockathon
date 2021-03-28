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

import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import contractUtil from './contractUtil'

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
  const { account, library } = useWeb3React();

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
          <FormField name="name" label="Fund Name">
            <TextInput
              id="text-input-id"
              name="name"
              onChange={(e) => setValue(e.target.value)}
            />
          </FormField>
          <FormField label="Fund Description">
            <TextInput />
          </FormField>
          <FormField label="Fund Limit (USD)">
            <TextInput />
          </FormField>
          <Box direction="row" gap="medium">
            <Button
              type="submit"
              primary
              label="Submit"
              onClick={async () => {
                await createNewFund(library)
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

const WBTC = '0x6F065a63600f6c7A9eF121993B0151b89EFA795E';
const WETH = '0x2170Ed0880ac9A755fd29B2688956BD959F933F8';
const WBNB = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';

async function createNewFund(library) {
  const contract = contractUtil.getFundDeployerContractWithSigner(library)
  const tx = await contract.deployFund('TEAM', 'Fund', 1000, [WBTC, WETH, WBNB])

  await library.waitForTransaction(tx.hash)
}

export default FundManagerList;
