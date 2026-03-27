import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { LocalMovies, Home, History, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" className="navbar-red">
      <Toolbar className="container d-flex justify-content-between">
        {}
        <Typography
          variant="h6"
          fontWeight="900"
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
          onClick={() => navigate("/")}
        >
          <LocalMovies /> MovieBooking
        </Typography>

        {/* Menu Buttons */}
        <div className="d-flex gap-2">
          <Button
            className="neon-outline"
            startIcon={<Home />}
            onClick={() => navigate("/")}
          >
            Home
          </Button>

          <Button
            className="neon-outline"
            startIcon={<History />}
            onClick={() => navigate("/history")}
          >
            History
          </Button>

          <Button
            className="neon-outline"
            startIcon={<Person />}
            onClick={() => navigate("/profile")}
          >
            Profile
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}