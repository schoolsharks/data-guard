import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import background from "../../../assets/home-page-bg.webp";
import SwipeBar from "../../../components/SwipeBar";
import { useNavigate } from "react-router-dom";
import zIndex from "@mui/material/styles/zIndex";

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
      position="relative"
    >
      <Typography
        variant={"h3"}
        fontSize="2.8rem"
        fontWeight="700"
        textAlign={"center"}
        zIndex={1}
        maxWidth={"200px"}
        color={theme.palette.text.main}
        margin={"120px auto 22px"}
        sx={{
          minWidth: "max-content",
          textShadow: "2px 2px 4px #fff",
        }}
      >
        DATA GUARD
      </Typography>
      <Stack
        color={theme.palette.text.main}
        margin={"auto 12px 180px"}
        gap={"16px"}
        position={"relative"}
        padding={"8px"}
      >
        <Box zIndex={"2"}>
          <Typography
            variant="body2"
            fontWeight={"500"}
            fontSize={"1rem"}
            margin={"0 0 12px"}
          >
            You are a CEO of "Sniff & Tail," a unique startup that creates
            personalized perfumes for pets.
          </Typography>
          <Typography variant="body2" fontWeight={"500"} fontSize={"1rem"}>
            The goal is to navigate through business and ethical dilemmas,
            aiming to grow both financial resources and customer loyalty in
            shortest possible time.
          </Typography>
          <Typography variant="body2" fontWeight={"500"} fontSize={"1rem"}>
            Play to:
            <br />
            Maximise Wealth
            <br />
            Maximise Customer Happiness
            <br />
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "0",
            left: "0",
            bgcolor: "#ffffff",
            zIndex: "1",
            filter: "blur(10px)",
            opacity: "0.5",
          }}
        />
      </Stack>
      <Stack position={"fixed"} bottom={"0"} width={"100%"} maxWidth={"900px"}>
        <Button
          onClick={handleGetStarted}
          variant="contained"
          sx={{
            fontSize: "1.25rem",
            textTransform: "none",
            padding: "16px",
            borderRadius: "24px",
            margin: "28px",
            boxShadow: "none",
          }}
        >
          Get Started
        </Button>
        {/* <SwipeBar onSwipe={handleOnSwipe} /> */}
      </Stack>
      <Box
        component={"img"}
        src={background}
        alt=""
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: "-1",
          opacity: "0.55",
          objectFit:"contain",
          objectPosition:"100% 100%"
        }}
      />
    </Stack>
  );
};

export default Home;
