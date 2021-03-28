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
          label={giveAsset || "WBNB Amount"}
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
          <BuyButton setSubmitted={setSubmitted} giveValue={giveValue} />
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

const takeTokenPrice = 7
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
  return `(~${formatUsd(giveValue * 261.18)})`
}

function formatUsd(usdAmount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(usdAmount);
}

function BuyButton(props) {
  const { account, library } = useWeb3React();
  const { setSubmitted, giveValue } = props

  if (!account || !library) {
    return <span></span>
  }

  const buy = async () => {
    // const wbnb = contractUtil.getWBNBContractWithSigner(library, 'WBNB')
    // wbnb.approve(contractUtil.contractAddresses.PIKA,'0x100000000000000000000')
    // const tx = await bep20WithSigner.approve(addressSpender, minAllowance)
    await contractUtil.tryApproveBep20Token(library, 'WBNB', contractUtil.contractAddresses.FUNDTOKEN)
    // await contractUtil.tryApproveBep20Token(library, 'WBNB', contractUtil.contractAddresses.CAKE)

    // const wbnb = contractUtil.getWBNBContractWithSigner(library, 'WBNB')
    // const minAllowance = '20000000000000000000';
    // const allowance = await bep20WithSigner.allowance(contractAddress, addressSpender)

    // const tx = await wbnb.approve(contractUtil.contractAddresses.FUNDTOKEN, minAllowance)
    // await library.waitForTransaction(tx.hash)

    // const tx2 = await wbnb.approve(contractUtil.contractAddresses.CAKE, minAllowance)
    // await library.waitForTransaction(tx2.hash)

    const contract = contractUtil.getFundTokenContractWithSigner(library)
    const depositTx = await contract.depositAsset(contractUtil.contractAddresses.WBNB, ethers.utils.parseEther(giveValue))
    console.log(depositTx)
    await library.waitForTransaction(depositTx.hash)
    setSubmitted(true)

    // const contract = contractUtil.getFundTokenContractWithSigner(library)
    // const tx = await contract.swapAsset(
    //   contractUtil.contractAddresses.WBNB,
    //   contractUtil.contractAddresses.BUSD,
    //   '1000000000000000000', { gasLimit: '1000000' })
    // console.log(tx)
    // await library.waitForTransaction(tx.hash)
    // setSubmitted(true)
  }
  return (<span>
    <Button type="submit" primary label="Submit" onClick={buy} />
  </span>
  )
}

export default TradeModal;