import { Stack, useTheme } from "@mui/material";
import React from "react";
import { handleHaptic } from "../utils/haptic";

const Button = ({ children }) => {
  const theme=useTheme()
  return (
    <Stack
      onClick={() => handleHaptic()}
      border={`4px solid ${theme.palette.text.main}`}
      borderRadius={"50%"}
      width="fit-content"
      sx={{
        transition: "all 0.3s ease",
        cursor:"pointer",
        "&:active": { transform: "scale(1.2)" },
      }}
      >
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        border={"4px solid #fff"}
        bgcolor={theme.palette.primary.main}
        width="fit-content"
        padding="12px"
        height="auto"
        borderRadius={"50%"}
        color="#00416A"
        sx={{ aspectRatio: "1/1" }}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default Button;
