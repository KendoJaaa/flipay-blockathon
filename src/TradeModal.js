import {
  Heading,
  Button,
  Layer,
  TextInput,
  Form,
  FormField,
  Box,
} from "grommet";
import styled from "styled-components";

import { Down } from "grommet-icons";

import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'

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

const Modal = styled.div`
  margin: 50px;
  margin-top: 20px;
`;

function TradeModal({
  onClose,
  title,
  giveAsset,
  giveValue,
  setGiveValue,
  takeAsset,
}) {
  return (
    <Layer onEsc={onClose} onClickOutside={onClose}>
      <Modal>
        <Heading level={3} textAlign="center">
          {title || "Buy Fund"}
        </Heading>

        <FormField
          name="name"
          htmlFor="text-input-id"
          label={giveAsset || "BUSD Amount"}
        >
          <TextInput id="text-input-id" name="giveAmount" textAlign="end" value={giveValue} onChange={event => setGiveValue(event.target.value)} />
        </FormField>
        <Row>
          <Circle>
            <Down color="plain" size="medium" />
          </Circle>
        </Row>
        <FormField
          name="name"
          htmlFor="text-input-id"
          label={(takeAsset || "Growth Fund Token") + " " + calculateEstTakeValueUsd(giveValue)}
        >
          <TextInput
            id="text-input-id"
            name="takeAmount"
            disabled
            textAlign="end"
            value={calculateTakeValue(giveValue)}
          />
        </FormField>
        <Box direction="row" gap="large" margin="large">
          <BuyButton />
          <Button type="cancel" label="Cancel" onClick={onClose} />
        </Box>
      </Modal>
    </Layer>
  );
}

const takeTokenPrice = 12.8
function calculateTakeValue(giveValue) {
  if (giveValue === '') {
    return ''
  }

  return (parseFloat(giveValue) / takeTokenPrice).toFixed(3)
}

function calculateEstTakeValueUsd(giveValue) {
  if (giveValue === '') {
    return ''
  }
  return `(~${formatUsd(giveValue)})`
}

function formatUsd(usdAmount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(usdAmount);
}

const contractAddresses = {
  // PIKA: '0x1C76e0FC510c33c2804f4362fa9197AEeADc9fF2', // testnet
  // PIKA: '0x39F5839d4E20d252f90d20FB7f8228372a26601c', // local
  FUNDTOKEN: '0xF6E8fef041b45cFC625EE6fE92409cB7Ae94bE98', // local 2

  WBTC: '0x6F065a63600f6c7A9eF121993B0151b89EFA795E',
  WETH: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
  WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
}

function BuyButton() {
  const { account, library } = useWeb3React();
  if (!account || !library) {
    return <span></span>
  }

  const buy = async () => {
    const contract = getFundTokenContractWithSigner(library)
    const tx = await contract.depositAsset(contractAddresses.WBNB, 100000)
    console.log(tx)

    // await tryApproveBep20Token(library, 'PIKA', '0x2e915b2eADe327c4CcC645b5086D92412284C143')
    // const pikaAddress = '0x1C76e0FC510c33c2804f4362fa9197AEeADc9fF2'
    // const pikaAbi = require('./abi/bep20abi.json')
    // const pikaContract = new ethers.Contract(pikaAddress, pikaAbi, library);
    // const pikaWithSigner = pikaContract.connect(library.getSigner());

  }
  return <Button type="submit" primary label="Submit" onClick={buy} />
}

function getFundTokenContractWithSigner(library) {
  const contractAddress = contractAddresses['FUNDTOKEN']
  const fundTokenAbi = require('./abi/FundToken.abi.json')
  const fundTokenContract = new ethers.Contract(contractAddress, fundTokenAbi, library);
  const fundTokenWithSigner = fundTokenContract.connect(library.getSigner());

  return fundTokenWithSigner
}

function getBep20ContractWithSigner(library, symbol) {
  const contractAddress = contractAddresses[symbol]
  const bep20Abi = require('./abi/bep20abi.json')
  const bep20Contract = new ethers.Contract(contractAddress, bep20Abi, library);
  const bep20WithSigner = bep20Contract.connect(library.getSigner());

  return bep20WithSigner
}

async function tryApproveBep20Token(library, symbol, addressSpender) {
  const contractAddress = contractAddresses[symbol]
  const bep20Abi = require('./abi/bep20abi.json')
  const bep20Contract = new ethers.Contract(contractAddress, bep20Abi, library);
  const bep20WithSigner = bep20Contract.connect(library.getSigner());

  const minAllowance = '0x100000000000000000000';
  const allowance = await bep20WithSigner.allowance(contractAddress, addressSpender)

  if (allowance.lt(minAllowance)) {
    console.log('allowance not enough, getting approval')
    const tx = await bep20WithSigner.approve(addressSpender, minAllowance)
    console.log('approve: ', tx)
  } else {
    console.log('allowance enough, skipped approval')
  }
}

export default TradeModal;
