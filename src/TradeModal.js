import { useState } from "react";
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

import { Down, StatusGood } from "grommet-icons";

import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import contractUtil from './contractUtil'

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
  const [submitted, setSubmitted] = useState();

  const renderSubmittedContent = () => {
    return (
      <div>
        <Heading level={3} textAlign="center">
          Trade Successfully
        </Heading>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <StatusGood color="green" size="xlarge" />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button primary label="OK" onClick={onClose} />
        </div>
      </div>
    );
  };

  const renderTradeContent = () => {
    return (
      <div>
        <Heading level={3} textAlign="center">
          {title || "Buy Fund"}
        </Heading>
        <FormField
          name="name"
          htmlFor="text-input-give"
          label={giveAsset || "BUSD Amount"}
        >
          <TextInput
            id="text-input-give"
            name="giveAmount"
            textAlign="end"
            value={giveValue}
            onChange={e => setGiveValue(e.target.value)}
          />
        </FormField>
        <Row>
          <Circle>
            <Down color="plain" size="medium" />
          </Circle>
        </Row>
        <FormField
          name="name"
          htmlFor="text-input-take"
          label={(takeAsset || "Growth Fund Token") + " " + calculateEstTakeValueUsd(giveValue)}
        >
          <TextInput
            id="text-input-take"
            name="takeAmount"
            disabled
            textAlign="end"
            value={calculateTakeValue(giveValue)}
          />
        </FormField>
        <Box direction="row" gap="large" margin="large">
          <BuyButton setSubmitted={setSubmitted} />
          <Button label="Cancel" onClick={onClose} />
        </Box>
      </div>
    );
  };

  return (
    <Layer onEsc={onClose} onClickOutside={onClose}>
      <Modal>
        {submitted ? renderSubmittedContent() : renderTradeContent()}
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

function BuyButton(props) {
  const { account, library } = useWeb3React();
  const { setSubmitted } = props

  if (!account || !library) {
    return <span></span>
  }

  const swap = async () => {
    const wbnb = contractUtil.getWBNBContractWithSigner(library, 'WBNB')
    const wrapTx = await wbnb.deposit({ value: ethers.utils.parseEther('1.0') })
    const r = await library.waitForTransaction(wrapTx.hash)

    console.log(r)
  }

  const buy = async () => {
    // const wbnb = getBep20ContractWithSigner(library, 'WBNB')
    // const wrapTx = await wbnb.deposit().send({ value: '1000000000000000000' })

    // const wrapTx = await library.getSigner().sendTransaction({
    //   to: contractAddresses.WBNB,
    //   // value: ethers.utils.parseEther("1.0")
    //   value: '500000000000000000',
    // });
    // console.log(wrapTx)

    const contract = contractUtil.getFundTokenContractWithSigner(library)
    const tx = await contract.depositAsset(contractUtil.contractAddresses.WBNB, 100000)
    console.log(tx)
    await library.waitForTransaction(tx.hash)
    setSubmitted(true)

    // await tryApproveBep20Token(library, 'PIKA', '0x2e915b2eADe327c4CcC645b5086D92412284C143')
    // const pikaAddress = '0x1C76e0FC510c33c2804f4362fa9197AEeADc9fF2'
    // const pikaAbi = require('./abi/bep20abi.json')
    // const pikaContract = new ethers.Contract(pikaAddress, pikaAbi, library);
    // const pikaWithSigner = pikaContract.connect(library.getSigner());
  }
  return (<span>
    <Button type="submit" primary label="Swap" onClick={swap} />
    <Button type="submit" primary label="Submit" onClick={buy} />
  </span>
  )
}

export default TradeModal;