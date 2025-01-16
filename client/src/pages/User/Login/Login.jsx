import {
  Box,
  Button,
  Checkbox,
  Dialog,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { loginValidation } from "../../../utils/loginValidation";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../app/userSlice";
import "../../../App.css";
import { Close, Share } from "@mui/icons-material";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [tncModal, setTncModal] = useState(false);
  const [tncAccepted, setTncAccepted] = useState(false);
  const { user, error: userError, status } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/questions");
    } else if (status === "failed") {
      setError(userError);
    }
  }, [status, userError, navigate]);

  const handleSubmit = () => {
    setError("");
    const response = loginValidation({email, name,company});
    if (!response.success) {
      setError(response.error);
    } else {
      console.log("Inside component ",phone)
      dispatch(createUser({ name, email, phone,company }));
    }
  };

  const handleInviteFriends = () => {
    const websiteURL = window.location.origin;

    if (navigator.share) {
      navigator.share({
        title: "Invite Friends",
        text: "Join me on this awesome app!",
        url: websiteURL,
      });
    } else {
      navigator.clipboard
        .writeText(websiteURL)
        .then(() => {
          alert("Website URL copied to clipboard: " + websiteURL);
        })
        .catch((err) => {
          console.error("Failed to copy URL: ", err);
        });
    }
  };

  if (user) {
    return <Navigate to="/questions" />;
  }

  return (
    <Stack
      className="user-login"
      width="100%"
      height={`${window.innerHeight < 616 ? 616 : window.innerHeight}px`}
      position="relative"
      alignItems={"center"}
    >
      <Stack flex="1" width={"100%"} alignItems={"center"} justifyContent={"center"}>
      <Stack>
        <Typography
          variant="h5"
          fontWeight={"500"}
          fontSize="2.5rem"
          color={theme.palette.text.main}
        >
          LOGIN
        </Typography>
      </Stack>
      <Stack
        width={"80%"}
        gap="1rem"
        sx={{ maxWidth: "430px" }}
        marginTop={"1rem"}
      >
        <TextField
          label="Name *"
          variant="standard"
          placeholder="eg. Vanessa Jenson"
          value={name}
          onChange={(e) => {
            setError("");
            setName(e.target.value);
          }}
        />
        <TextField
          label="Company Name*"
          type="text"
          variant="standard"
          placeholder="eg.xxxxxxxx"
          value={company}
          onChange={(e) => {
            setError("");
            setCompany(e.target.value);
          }}
        />
        <TextField
          label="Email"
          type="email"
          variant="standard"
          placeholder="eg. xoxo@gmail.com"
          value={email}
          onChange={(e) => {
            setError("");
            setEmail(e.target.value);
          }}
        />
        <TextField
          label="Phone Number"
          variant="standard"
          placeholder="eg. xxxxxxxxxx"
          value={phone}
          onChange={(e) => {
            setError("");
            setPhone(e.target.value);
          }}
        />
        <Stack direction={"row"} alignItems={"center"}>
          <Checkbox
            checked={tncAccepted}
            onChange={() => setTncAccepted((prev) => !prev)}
            sx={{ "&.MuiCheckbox-root": { color: theme.palette.text.main } }}
          />
          <Typography fontWeight={"500"} color={"#75B8E3"}>
            I agree to the
          </Typography>
          <Typography
            onClick={() => setTncModal(true)}
            sx={{
              color: theme.palette.text.main,
              textDecoration: "underline",
              cursor: "pointer",
              marginLeft: "4px",
              fontFamily: "Roboto",
            }}
          >
            Terms & conditions
          </Typography>
        </Stack>
        <Typography color="#d61a1a" sx={{ minHeight: "1rem" }}>
          {error}
        </Typography>
      </Stack>
      </Stack>
      <Stack
        gap={"8px"}
        sx={{
          margin: "auto 0 0",
          width: "80%",
          maxWidth: "430px",
          color: theme.palette.text.main,
        }}
      >
        <Typography fontSize={"0.7rem"}>Note: * refers to mandatory</Typography>
        <Button
          endIcon={<Share />}
          onClick={handleInviteFriends}
          sx={{
            color: theme.palette.text.main,
            border: `2px solid ${theme.palette.text.main}`,
            width: "max-content",
            borderRadius: "9px",
          }}
        >
          Invite a friend
        </Button>
      </Stack>
      <Stack
        // position={"fixed"}

        // bottom={"1.5rem"}
        width={"100%"}
        maxWidth={"900px"}
      >
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!tncAccepted}
          sx={{
            fontSize: "1.25rem",
            textTransform: "none",
            padding: "16px",
            borderRadius: "24px",
            margin: "28px",
            boxShadow: "none",
          }}
        >
          {tncAccepted ? "Get Started" : "Accept T&C to Continue"}
        </Button>
        {/* <SwipeBar onSwipe={handleSubmit} /> */}
      </Stack>
      <Dialog
        open={tncModal}
        onClose={() => {
          setTncModal(false);
        }}
        PaperProps={{
          sx: {
            bgcolor: theme.palette.primary.main,
            backdropFilter: "blur(4px)",
            borderRadius: "24px",
            border: "2px solid #fff",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
          },
        }}
      >
        <Stack padding={"12px"} color={"#fff"}>
          <Stack alignItems={"flex-end"}>
            <IconButton onClick={() => setTncModal(false)}>
              <Close sx={{ color: "#fff" }} />
            </IconButton>
          </Stack>
          <TermsAndConditionsContent />
        </Stack>
      </Dialog>
    </Stack>
  );
};

export default Login;

const TermsAndConditionsContent = () => {
  return (
    <>
      <Typography fontSize={"1.5rem"} fontWeight={"800"} marginTop={"12px"} textAlign={"center"}>
        TERMS & CONDITIONS
      </Typography>
      <Typography marginTop={"24px"} fontSize={"18px"}>
        This game is designed for fun and educational purposes only!
      </Typography>
      <Typography marginTop={"16px"} fontSize={"18px"}>
        No real data will be collected, stored, or shared during the game.
      </Typography>
      <Typography marginTop={"16px"} fontSize={"18px"}>
        All inputs will be erased after the game concludes unless you explicitly
        request to stay connected for follow-up discussions or insights.
      </Typography>
      <Typography marginTop={"16px"} fontSize={"18px"}>
        Enjoy the experience without any worries!
      </Typography>
    </>
  );
};
