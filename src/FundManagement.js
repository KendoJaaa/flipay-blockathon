import styled from "styled-components";
import { Heading, DataTable, Box, Meter, Text, Button } from "grommet";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

function FundManagement() {
  return (
    <div>
      <Heading>Asset Management</Heading>
      <DataTable
        columns={[
          {
            property: "name",
            header: <Text>Asset</Text>,
            primary: true,
          },
          {
            property: "percent",
            header: "Complete",
            render: (datum) => (
              <Row>
                <Button primary>Swap</Button>
                <Button primary>Farm</Button>
              </Row>
            ),
          },
        ]}
        data={[
          { name: "Alan", percent: 20 },
          { name: "Bryan", percent: 30 },
          { name: "Chris", percent: 40 },
          { name: "Eric", percent: 80 },
        ]}
      />
    </div>
  );
}

export default FundManagement;
