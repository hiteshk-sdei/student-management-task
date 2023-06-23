import React from "react";
import {
  Typography,
  AppBar,
  Container,
  Grid,
} from "@mui/material";
import welcome from "../../Assets/images/hello.png";

const Header = () => {
  return (
    <AppBar position="static" sx={{ padding: 0 }}>
      <Container className="container">
        <Grid container alignItems="center">
          <Grid item sm={6}>
            <Typography className="header-title">
              <img alt="welcome" src={welcome} /> Welcome User
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};
export default Header;
