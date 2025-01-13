import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import OurButton from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import TotalPlayers from "../../../components/TotalPlayers";
import { useNavigate } from "react-router-dom";
import "./Finished.css";
import {
  resetState,
  sendConnectionRequest,
  setUser,
} from "../../../app/userSlice";
import homeIcon from "../../../assets/homeIcon.svg";
import { KeyboardArrowUp } from "@mui/icons-material";

const Finished = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [connectionLoading, setConnectionLoading] = useState(false);
  const [inputMail, setInputMail] = useState("");

  const {
    user,
    email,
    name,
    wealth,
    investment,
    totalPlayers,
    goalReachPercentage,
    connectionRequested,
  } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleReset = () => {
    localStorage.clear();
    dispatch(resetState());
    navigate("/home");
  };

  const handleConnectRequest = async () => {
    setConnectionLoading(true);
    try {
      await dispatch(
        sendConnectionRequest({ userId: user, email: email || inputMail })
      ).unwrap();
      dispatch(setUser({ connectionRequested: true }));
    } catch (error) {
      console.log(error);
    } finally {
      setConnectionLoading(false);
    }
  };

  return (
    <Stack className="user-completed-page">
      <Stack
        borderRadius="16px"
        padding="1rem"
        margin="4em 24px 0"
        gap="8px"
        color={"#ffffff"}
        bgcolor={"#136FA9"}
        border={`4px solid ${theme.palette.primary.main}`}
      >
        <Typography fontSize={"1.5rem"} fontWeight="500">
          {name}
        </Typography>
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography>Turnover</Typography>
          <Typography fontWeight="700">{wealth}</Typography>
        </Stack>
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography>Impact</Typography>
          <Typography fontWeight="700">{investment}</Typography>
        </Stack>
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography>Penalty Paid</Typography>
          <Typography fontWeight="700">{wealth + investment}</Typography>
        </Stack>
      </Stack>

      <Stack color={theme.palette.text.main} marginTop={"40px"}>
        <Typography fontSize="1.5rem" fontWeight="700" margin="20px 40px 12px">
          Looking for a workshop or one to one consulting
        </Typography>
        {connectionLoading ? (
          <CircularProgress sx={{ color: "#fff", margin: "8px 0" }} />
        ) : null}
        {connectionRequested && !connectionLoading ? (
          <Typography marginLeft={"40px"}>
            Your connection request is sent successfully!
          </Typography>
        ) : (
          <Stack direction={"row"} gap={"12px"}>
            {!email ? (
              <TextField
                placeholder="Enter your email"
                value={inputMail}
                onChange={(e) => setInputMail(e.target.value)}
              ></TextField>
            ) : null}
            <Button
              variant="outlined"
              onClick={handleConnectRequest}
              sx={{
                textTransform: "none",
                fontSize: "0.8rem",
                padding: "5px 12px",
                color: theme.palette.text.main,
                maxWidth: "max-content",
                borderRadius: "24px",
                margin: email ? "0 32px" : "",
                border: `2px solid ${theme.palette.text.main}`,
                "&:hover": { border: `2px solid ${theme.palette.text.main}` },
              }}
            >
              {email ? "Connect with A&P Partners" : "Connect"}
            </Button>
          </Stack>
        )}
      </Stack>

      <Stack
        sx={{
          marginTop: "34px",
          color: "#fff",
          padding: "16px",
          background: "linear-gradient(180deg, #2296DD 0%, #01416A 100%)",
        }}
      >
        <Typography
          fontSize={"2.8rem"}
          textAlign={"right"}
          sx={{ fontFamily: "LCD Solid" }}
        >
          Over 70%
        </Typography>
        <Typography
          fontSize={"1.25rem"}
          textAlign={"right"}
          sx={{ fontFamily: "LCD Solid" }}
        >
          Liked IDFC Bank offerings
        </Typography>
        <Typography
          textAlign={"right"}
          sx={{ fontFamily: "LCD Solid", verticalAlign: "center" }}
        >
          Preferences
          <KeyboardArrowUp sx={{ transform: "translateY(4px)" }} />
        </Typography>
        {Array.from({ length: 4 }).map(() => (
          <Stack
            border={"1px solid #ffffff"}
            borderRadius={"4px"}
            padding={"12px"}
            marginTop={"20px"}

          >
            <Typography sx={{fontFamily:"OCR-A BT"}}>
              IDFC First Bank provides ₹6 lakh lost card liability. Do you:
            </Typography>
            <Box
              height="10px"
              width={"100%"}
              bgcolor={"#ffffff"}
              borderRadius={"10px"}
              overflow={"hidden"}
              marginTop={"24px"}
            >
              <Box height={"100%"} borderRadius={"10px"} width={"70%"} bgcolor={"#75B8E3"}/>
            </Box>
            <Typography marginTop={"12px"} fontWeight={"600"}>Opt-70%</Typography>
          </Stack>
        ))}
      </Stack>
      <Button variant="outlined" onClick={handleReset} sx={{margin:"16px",fontSize:"1.25rem",borderRadius:"12px"}}>Play again</Button>
    </Stack>
  );
};

export default Finished;
