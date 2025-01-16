import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import background from "../../../assets/home-page-bg.webp";
import { useNavigate } from "react-router-dom";
import wgabLogo from "../../../assets/wgab-logo.webp";
import anpPartnersLogo from "../../../assets/anp-partners-logo.webp";
import riskItLogo from "../../../assets/risk-it-logo.webp";
import { CheckBoxOutlined } from "@mui/icons-material";

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/login");
  };
  return (
    <Stack
      width="100%"
      height={`${window.innerHeight < 616 ? 616 : window.innerHeight}px`}
      sx={{
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        padding={"16px 12px"}
      >
        <img src={anpPartnersLogo} alt="WGAB" style={{ width: "50px" }} />
        <img src={wgabLogo} alt="A&P Partners" style={{ width: "70px" }} />
      </Stack>

      <Stack alignItems={"center"} margin={"12px auto 12px"}>
        <img src={riskItLogo} alt="" style={{ width: "90px" }} />
        <Typography
          fontSize="1.5rem"
          fontWeight="700"
          textAlign={"center"}
          zIndex={1}
          maxWidth={"200px"}
          color={theme.palette.text.main}
          sx={{
            minWidth: "max-content",
            textShadow: "2px 2px 4px #fff",
          }}
        >
          Risk It or Fix It
        </Typography>
      </Stack>
      <Stack
        color={theme.palette.text.main}
        gap={"16px"}
        position={"relative"}
        margin={"0px 12px"}
        padding={"12px 16px"}
        borderRadius={"24px"}
        sx={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #A1C1D8 100%)",
        }}
      >
        <Typography variant="body2" fontWeight={"600"} margin={"0 0 12px"}>
          Welcome to <b>FinPeak!</b>
          <br />
          Congratulations! You’ve just been appointed CEO for a day at FinPeak,
          the fintech company everyone’s talking about.
          <br />
          <br />
          Starting with a budget of <b>₹500,000</b>, you’ll face a series of
          critical decisions. Each choice will test your ability to:
          <br />
          <Stack direction={"row"} gap={"4px"} alignItems={"center"}>
            <CheckBoxOutlined style={{ fontSize: "16px" }} />
            <Typography>Balance profits with ethics.</Typography>
          </Stack>
          <Stack direction={"row"} gap={"4px"} alignItems={"center"}>
            <CheckBoxOutlined style={{ fontSize: "16px" }} />
            <Typography>Avoid regulatory pitfalls.</Typography>
          </Stack>
          <Stack direction={"row"} gap={"4px"} alignItems={"center"}>
            <CheckBoxOutlined style={{ fontSize: "16px" }} />
            <Typography>Every choice matters.</Typography>
          </Stack>
          <br />
          You’ll have just <b>30 seconds</b> to make each decision.
        </Typography>
        <Typography color={"#44799BA1"} fontSize={"14px"}>
          Game Inspired by: Digital Personal Data Protection Act, 2023.
        </Typography>
      </Stack>
      <Stack width={"100%"} maxWidth={"900px"} marginTop={"auto"}>
        <Button
          onClick={handleGetStarted}
          variant="contained"
          sx={{
            fontSize: "1.25rem",
            textTransform: "none",
            padding: "16px",
            borderRadius: "24px",
            margin: "12px 28px",
            boxShadow: "none",
          }}
        >
          Get Started
        </Button>
        {/* <SwipeBar onSwipe={handleOnSwipe} /> */}
      </Stack>
    </Stack>
  );
};

export default Home;
