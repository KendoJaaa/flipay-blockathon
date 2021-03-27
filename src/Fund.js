import { useState } from "react";
import styled from "styled-components";
import { Heading, Button, Layer } from "grommet";

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

const StyledButton = styled(Button)`
  margin-left: 20px;
`;

function Fund() {
  const [show, setShow] = useState();
  return (
    <Page>
      <Header>
        <Heading>Growth Fund</Heading>
        <div>
          <StyledButton primary label="Buy" />
          <StyledButton primary label="Sell" />
        </div>
      </Header>
      {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >
          <Button label="close" onClick={() => setShow(false)} />
        </Layer>
      )}
    </Page>
  );
}

export default Fund;
