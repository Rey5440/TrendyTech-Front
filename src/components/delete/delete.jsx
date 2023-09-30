// import DeleteUser from "../deleteUser/deleteUser";
import DeleteProduct from "../deleteProduct/deleteProduct";
import { Button, Container } from "@mui/material";
import Nav from "../nav/nav";
import { useState } from "react";

const handleOption = (event) => {};
const [selectedList, setSelectedList] = useState("");

const Delete = () => {
  return (
    <div>
      <Nav />
      <Container>
        {selectedList ? (
          (selectedList === "" && <DeleteUser />) ||
          (selectedList === "" && <DeleteProduct />)
        ) : (
          <Container>
            <Button value="users" onClick={handleOption}>
              Users
            </Button>
            <Button value="products" onClick={handleOption}>
              Products
            </Button>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default Delete;
