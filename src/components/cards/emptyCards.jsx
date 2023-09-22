import { Container, Box } from "@mui/system";
export default function Empty() {
  return (
    <Container
      sx={{
        backgroundColor: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
      }}
    >
      <Box>
        <h4>Lo siento! No existen productos con esas características</h4>
      </Box>
    </Container>
  );
}
