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

import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import contractUtil from './contractUtil'

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

function Util() {
  const { account, library } = useWeb3React();

  return (
    <Page>
      <Heading margin="none">Utility</Heading>
      <Padding />
      <Button primary onClick={() => wrap(library)}> Wrap 1,000 BNB </Button>
    </Page>
  );
}

async function wrap(library) {
  const wbnb = contractUtil.getWBNBContractWithSigner(library, 'WBNB')
  const wrapTx = await wbnb.deposit({ value: ethers.utils.parseEther('1000.0') })
  const r = await library.waitForTransaction(wrapTx.hash)

  console.log(r)
}

export default Util;
