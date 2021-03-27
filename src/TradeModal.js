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
          <Button type="submit" primary label="Submit" />
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

export default TradeModal;
