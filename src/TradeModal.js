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

function TradeModal({ onClose, giveValue, setGiveValue }) {
  return (
    <Layer onEsc={onClose} onClickOutside={onClose}>
      <Modal>
        <Heading level={3} textAlign="center">
          Buy Fund
        </Heading>
        <Form
          value={giveValue}
          onChange={(nextValue) => setGiveValue(nextValue)}
          onSubmit={({ value }) => {}}
        >
          <FormField name="name" htmlFor="text-input-id" label="BUSD Amount">
            <TextInput id="text-input-id" name="giveAmount" textAlign="end" />
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
            <Button type="cancel" label="Cancel" onClick={onClose} />
          </Box>
        </Form>
      </Modal>
    </Layer>
  );
}

export default TradeModal;
