import styled from "styled-components";

const Container = styled.div`
  color: ${(props) => (props.value > 0 ? "green" : "red")};
`;

function Badge({ value, color }) {
  return <Container value={value}>{value} %</Container>;
}

export default Badge;
