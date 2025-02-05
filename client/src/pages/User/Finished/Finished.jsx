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
// import OurButton from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
// import TotalPlayers from "../../../components/TotalPlayers";
import { useNavigate } from "react-router-dom";
import "./Finished.css";
import {
  resetState,
  sendConnectionRequest,
  setUser,
} from "../../../app/userSlice";
import homeIcon from "../../../assets/homeIcon.svg";
import {
  // Cached,
  CheckBoxOutlined,
  Home,
  // KeyboardArrowUp,
} from "@mui/icons-material";
import MyButton from "../../../components/Button";
import useQnaResponses from "../../../hooks/useQnaResponses";
import CircleProgress from "../../../components/CircleProgress";
import { formatAmount } from "../../../utils/formatAmount";
import { motion } from "framer-motion";

const questions = [
  {
    id: 1,
    question:
      "Have you implemented a consent mechanism to ensure users explicitly agree to data collection practices?",
  },
  {
    id: 2,
    question:
      "Are you prepared to notify the Data Protection Board of India in case of a data breach within the mandated timeframe?",
  },
  {
    id: 3,
    question:
      "Do your current data practices align with the rights of individuals under the DPDP Act, such as data access and correction?",
  },
  {
    id: 4,
    question:
      "Do you know the penalty for non-adherence can be as high as ₹250 crore, depending on the severity of the violation?",
  },
];

const keyNotes = [
  {
    title: null,
    description:
      "Safeguarding personal data is both a right and a responsibility—ensure compliance and stay informed!",
  },
  {
    title: "Purpose",
    description:
      "Protect personal data and ensure privacy, not just foster business growth.",
  },
  {
    title: "Personal Data",
    description:
      " Includes any information that identifies a person, especially in digital formats.",
  },
  {
    title: "Key Roles",
    description:
      "Entities deciding the purpose and method of data processing. Data Principals: Individuals whose data is being processed.",
  },
  {
    title: "Consent",
    description:
      "Generally required but exceptions exist (e.g., emergencies or legal mandates).",
  },
  {
    title: "Individual Rights",
    description:
      "Access your data, Correct inaccuracies, Request deletion in certain cases.",
  },
  {
    title: "Penalties",
    description: "Non-compliance can result in fines up to ₹250 crore.",
  },
  {
    title: "Children’s Data",
    description:
      "Special protections, including bans on targeted ads for minors.",
  },
  {
    title: "Complaint Process",
    description:
      "Resolve issues with the organisation first; escalate to the Data Protection Board if unresolved.",
  },
];
const Finished = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [connectionLoading, setConnectionLoading] = useState(false);
  const [inputMail, setInputMail] = useState("");
  const { averageResponses, updateResponse } = useQnaResponses();

  const {
    user,
    email,
    company,
    turnover,
    personalityInfo,
    // businessGrowth,
    finePaid,
    finePaidByGroup,
    totalPlayers,
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
        direction={"row"}
        justifyContent={"space-between"}
        padding={"20px 16px"}
      >
        <Typography color={"#44799B"} fontSize={"1.25rem"}>
          Active Players <b>{totalPlayers < 1 ? 1 : totalPlayers}</b>
        </Typography>
        {/* <Cached sx={{ color: "#44799B" }} /> */}
      </Stack>
      <Stack padding={"0 16px"}>
        <Typography
          marginTop={"54px"}
          fontSize={"30px"}
          fontWeight={"700"}
          color={theme.palette.text.main}
        >
          {company}
        </Typography>
        <Box
          sx={{
            color: "#ffffff",
            marginTop: "20px",
            padding: "20px 16px",
            borderRadius: "16px",
            background: "linear-gradient(180deg, #2296DD 42%, #125177 100%)",
          }}
        >
          <Typography fontSize={"30px"} fontWeight={"600"}>
            {personalityInfo?.personality}
          </Typography>
          <Typography
            fontSize={"1.25rem"}
            fontWeight={"600"}
            marginTop={"14px"}
          >
            {personalityInfo?.description}
          </Typography>
          <Typography fontSize={"18px"} fontWeight={"400"} marginTop={"14px"}>
            {personalityInfo?.criteria}
          </Typography>
        </Box>

        {/* Business Growth */}
        <Box
          marginTop={"35px"}
          borderRadius={"20px"}
          border={`3px solid #136FA9`}
          padding={"20px 16px"}
          bgcolor={"#fff"}
        >
          <Typography
            fontSize={"30px"}
            fontWeight={"700"}
            color={theme.palette.text.main}
          >
            Business Growth
          </Typography>
          <Stack alignItems={"center"} paddingBottom={"12px"}>
            <CircleProgress
              value={((turnover - 500000) * 100) / 500000}
              color={turnover >= 500000 ? "#22DD80" : "#DD2222"}
              rightAmount={turnover?.toFixed()}
            />
          </Stack>
        </Box>

        {/* Fines */}
        <Box
          marginTop={"35px"}
          borderRadius={"20px"}
          border={`3px solid #136FA9`}
          padding={"20px 16px"}
          color={theme.palette.text.main}
          bgcolor={"#fff"}
        >
          <Typography fontSize={"30px"} fontWeight={"700"}>
            Fines
          </Typography>
          <Stack
            marginTop={"28px"}
            alignItems={"center"}
            borderRadius={"8px"}
            direction={"row"}
            border={"2px solid #136FA9"}
            overflow={"hidden"}
            justifyContent={"space-between"}
          >
            <Typography
              margin={"18px 0 18px 12px"}
              fontSize="18px"
              color={"#00416A"}
            >
              Paid by You
            </Typography>
            <Box
              sx={{
                background: "linear-gradient(270deg, #034670 0%, #0686D6 100%)",
              }}
              width={"120px"}
            >
              <Typography
                color={"#fff"}
                margin={"18px 12px"}
                fontSize={"20px"}
                fontWeight={"600"}
              >
                {formatAmount(Math.abs(finePaid)).split(".")[0]}
              </Typography>
            </Box>
          </Stack>
          <Stack
            marginTop={"20px"}
            alignItems={"center"}
            borderRadius={"8px"}
            direction={"row"}
            border={"2px solid #136FA9"}
            overflow={"hidden"}
            justifyContent={"space-between"}
          >
            <Typography
              margin={"18px 0 18px 12px"}
              fontSize="18px"
              color={"#00416A"}
            >
              All Players Average
            </Typography>
            <Box
              sx={{
                background: "linear-gradient(270deg, #034670 0%, #0686D6 100%)",
              }}
              width={"120px"}
            >
              <Typography
                color={"#fff"}
                margin={"18px 12px"}
                fontSize={"20px"}
                fontWeight={"600"}
              >
                {formatAmount(Math.abs(finePaidByGroup)).split(".")[0]}
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Calculation Summary */}
        {/* <Box
          border={`1px solid ${theme.palette.text.main}`}
          marginTop={"35px"}
          borderRadius={"16px"}
          padding={"18px"}
          color={theme.palette.text.main}
        >
          <Typography fontWeight={"600"} fontSize={"20px"}>
            Calculation Summary:
          </Typography>
          <Typography fontSize={"15px"} fontWeight={"600"}>
            Every choice in the game impacts business profits (PAT) and
            potential penalties. Some decisions have compounding effects, where
            earlier choices influence future profits or fines. These
            calculations are for gameplay only and do not reflect real-world
            scenarios.
          </Typography>
        </Box> */}

        {/* Yes-No Section */}
        <Box
          sx={{
            background: "linear-gradient(180deg, #2194DA 0%, #02436D 100%)",
            padding: "24px",
            borderRadius: "24px",
            marginTop: "35px",
          }}
        >
          {questions.map((item, qindex) => {
            const percentageYes = averageResponses?.find(
              (item) => item.quesId === qindex + 1
            )?.percentageYes;
            if (percentageYes) {
              return (
                <Stack
                  border={"1px solid #ffffff"}
                  borderRadius={"10px"}
                  padding={"12px"}
                  marginTop={"20px"}
                  color={"#fff"}
                >
                  <Typography>{item.question}</Typography>
                  <Box
                    height="10px"
                    width={"100%"}
                    bgcolor={"#ffffff"}
                    borderRadius={"10px"}
                    overflow={"hidden"}
                    marginTop={"24px"}
                  >
                    <motion.div
                      initial={{ width: "0" }}
                      animate={{ width: `${percentageYes}%` }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                        delay: 0.5,
                      }}
                      style={{
                        height: "100%",
                        borderRadius: "10px",
                        backgroundColor: "#75B8E3",
                      }}
                    />
                  </Box>
                  <Typography marginTop={"12px"} fontWeight={"600"}>
                    Opt-{percentageYes}%
                  </Typography>
                </Stack>
              );
            } else
              return (
                <Box
                  key={qindex}
                  border="1px solid #ffffff"
                  borderRadius={"10px"}
                  padding={"15px"}
                  marginTop={"22px"}
                >
                  <Typography color={"#fff"}>{item.question}</Typography>
                  <Stack direction={"row"} marginTop={"24px"} gap={"4px"}>
                    {["YES", "NO"].map((val, index) => (
                      <Button
                        key={index}
                        variant="contained"
                        onClick={() => updateResponse(qindex + 1, val)}
                        sx={{
                          color: theme.palette.text.main,
                          flex: "1",
                          fontSize: "1.25rem",
                          fontWeight: "600",
                          bgcolor: "#FFFFFFB2",
                          "&:hover": {
                            bgcolor: "#FFFFFFB2",
                          },
                        }}
                      >
                        {val}
                      </Button>
                    ))}
                  </Stack>
                </Box>
              );
          })}
          {/* Connect Part */}
          <Stack color={"#fff"} marginTop={"40px"}>
            <Typography fontSize="1.5rem" fontWeight="700" margin="20px 0 12px">
              Looking for a workshop or one to one consulting with A&P Partners
            </Typography>
            {connectionLoading ? (
              <CircularProgress sx={{ color: "#fff", margin: "8px 0" }} />
            ) : null}
            {connectionRequested && !connectionLoading ? (
              <Typography>
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
                    color: "#fff",
                    maxWidth: "max-content",
                    borderRadius: "24px",
                    border: `2px solid #fff`,
                    "&:hover": {
                      border: `2px solid #fff`,
                    },
                  }}
                >
                  {email ? "Connect with A&P Partners" : "Connect"}
                </Button>
              </Stack>
            )}
          </Stack>
        </Box>

        {/* Key Notes Section */}
        <Box
          sx={{ border: `1px solid ${theme.palette.text.main}` }}
          color={theme.palette.text.main}
          padding={"16px"}
          marginTop="35px"
          borderRadius={"15px"}
        >
          <Stack gap={"12px"}>
            <Typography fontSize={"1.25rem"} fontWeight={"900"}>
              Key Takeaways
            </Typography>
            {keyNotes.map((item, index) => (
              <Stack direction={"row"} gap={"8px"}>
                <CheckBoxOutlined sx={{ fontSize: "22px", marginTop: "2px" }} />
                <Typography key={index} fontWeight={"600"} fontSize={"15px"}>
                  <b>{item.title && item.title + " :"}</b> {item.description}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Stack>

      <Stack
        alignItems="center"
        position="relative"
        margin="80px 0 48px"
        left="0"
        width="100%"
      >
        <Box
          width="80%"
          height="4px"
          bgcolor={theme.palette.primary.main}
          borderRadius="4px"
        />
        <Stack
          direction={"row"}
          position="absolute"
          left="50%"
          gap={"48px"}
          sx={{
            top: "50%",
            transform: "translateX(-50%) translateY(-50%)",
          }}
        >
          <Box onClick={handleReset}>
            <MyButton>
              <Home sx={{ fontSize: "40px", color: "#ffffff" }} />
            </MyButton>
          </Box>
        </Stack>
      </Stack>

      {/* <Stack
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
            <Typography sx={{ fontFamily: "OCR-A BT" }}>
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
              <Box
                height={"100%"}
                borderRadius={"10px"}
                width={"70%"}
                bgcolor={"#75B8E3"}
              />
            </Box>
            <Typography marginTop={"12px"} fontWeight={"600"}>
              Opt-70%
            </Typography>
          </Stack>
        ))}
      </Stack> */}
    </Stack>
  );
};

export default Finished;
