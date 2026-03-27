import React from "react";
import { Card, Typography, Avatar } from "@mui/material";

export default function Profile() {
  return (
    <div className="container mt-4">
      <Typography variant="h5" fontWeight="900" className="mb-3">
        My Profile 👤
      </Typography>

      <Card className="glass-card shadow p-4 text-center">
        <Avatar
          sx={{
            width: 80,
            height: 80,
            margin: "auto",
            bgcolor: "#ff003c",
            fontWeight: "900"
          }}
        >
          A
        </Avatar>

        <Typography
          variant="h6"
          fontWeight="900"
          className="mt-3"
          style={{ color: "white" }}
        >
          Anshika Sinha
        </Typography>

        <Typography variant="body2" className="sub-text">
          Bhopal | Madhya Pradesh
        </Typography>
      </Card>
    </div>
  );
}