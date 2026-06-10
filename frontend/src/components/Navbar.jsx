import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { LocalMovies, Home, History, Person, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="sticky" className="navbar-red">
      <Toolbar className="container d-flex justify-content-between">

        <Typography
          variant="h6"
          fontWeight="900"
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
          onClick={() => navigate("/")}
        >
          <LocalMovies /> MovieBooking
        </Typography>

        <div className="d-flex gap-2 align-items-center">
          <Button className="neon-outline" startIcon={<Home />} onClick={() => navigate("/")}>
            Home
          </Button>

          {isLoggedIn && (
            <>
              <Button className="neon-outline" startIcon={<History />} onClick={() => navigate("/history")}>
                History
              </Button>
              <Button className="neon-outline" startIcon={<Person />} onClick={() => navigate("/profile")}>
                {user?.name?.split(" ")[0]}
              </Button>
              <Button className="neon-outline" startIcon={<Logout />} onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Button className="neon-outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button variant="contained" color="error" onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          )}
        </div>

      </Toolbar>
    </AppBar>
  );
}