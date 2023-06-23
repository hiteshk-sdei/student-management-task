import { Button, Card, Grid, Typography } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <>
      <Card className="welcome-card">
        <Typography variant="h2" className="welcome-title">
          Welcome to <br /> Student Management System
        </Typography>
        <Typography className="welcome-text">
          Here you can track all students, courses and results of your portal.
        </Typography>
      </Card>
      <Grid></Grid>
    </>
  );
};

export default Home;