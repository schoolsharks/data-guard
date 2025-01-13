import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Stack,
  Typography,
  LinearProgress,
  useTheme,
  Box,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { fetchNextQuestion } from "../../../app/questionSlice";
import { motion, AnimatePresence } from "framer-motion";
import OptionA from "./OptionA";
import OptionB from "./OptionB";
import Button from "../../../components/Button";
import homeIcon from "../../../assets/homeIcon.svg";
import { Navigate, useNavigate } from "react-router-dom";
import { Home } from "@mui/icons-material";

const questionVariants = {
  initial: { opacity: 0, x: "100vw" },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: "-100vw" },
};

const questionTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const Question = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentQuestion, status, options, quesId, year } = useSelector(
    (state) => state.question
  );
  const { user, sq, wealth, investment, answered,totalPlayers } = useSelector(
    (state) => state.user
  );
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (!currentQuestion && user) {
      dispatch(
        fetchNextQuestion({
          userId: user,
          sq: sq,
          response: "",
          quesId: "",
          navigate,
        })
      );
    }
  }, [currentQuestion, dispatch, user]);

  const handleOptionSelect = (response) => {
    dispatch(
      fetchNextQuestion({
        userId: user,
        sq: sq,
        response,
        quesId: quesId,
        navigate,
      })
    );
  };

  if (answered === 25) {
    return <Navigate to="/completed" />;
  }

  return (
    <>
      {status === "loading" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            top: 0,
            left: isLargeScreen ? "-100%" : "0",
            width: isLargeScreen ? "175vw" : "100vw",
            height: `${window.innerHeight < 616 ? 616 : window.innerHeight}px`,
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.079)",
            clipPath: "-10px -10px -10px -50px",
            zIndex: 1,
          }}
        >
          <CircularProgress />
        </motion.div>
      )}
      <Stack
        minHeight={`${window.innerHeight < 616 ? 616 : window.innerHeight}px`}
        height="100vh"
        position="relative"
      >
        <AnimatePresence>
          {currentQuestion && (
            <motion.div
              key={currentQuestion}
              initial="initial"
              animate="in"
              exit="out"
              variants={questionVariants}
              transition={questionTransition}
              style={{ position: "relative", zIndex: 0 }}
            >
              <Stack
                padding="0 12px"
                height={`${
                  window.innerHeight < 616 ? 616 : window.innerHeight
                }px`}
                sx={{ overflowX: "hidden" }}
              >
                <Stack
                  direction="row"
                  marginTop="60px"
                  justifyContent="space-between"
                  alignItems={"center"}
                  color={theme.palette.text.main}
                >
                  <Stack>
                    <Typography
                      fontSize={"1.9rem"}
                      lineHeight={"1.5rem"}
                      fontWeight={"700"}
                    >
                      PAT
                    </Typography>
                    <Typography>(TURNOVER)</Typography>
                  </Stack>
                  <Typography fontSize={"1.9rem"} fontWeight={"700"}>
                    {wealth}
                  </Typography>

                  {/* <Stack alignItems="center" flex={1}>
                    <Typography  fontWeight={"500"}>
                      Bank Balance
                    </Typography>
                    <Typography variant="h6" fontWeight={"700"}>
                      {wealth}
                    </Typography>
                  </Stack>
                  <Stack alignItems="center" flex={1} fontWeight={"500"}>
                    <Typography >Investments</Typography>
                    <Typography variant="h6" fontWeight={"700"}>
                      {investment}
                    </Typography>
                  </Stack>
                  <Stack alignItems="center" flex={1} fontWeight={"500"}>
                    <Typography >Year</Typography>
                    <Typography variant="h6" fontWeight={"700"}>
                      {year}
                    </Typography>
                  </Stack> */}
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={(answered * 100) / 25}
                  sx={{
                    margin: "16px 0 8px",
                    borderRadius: "2px",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: theme.palette.text.main,
                    },
                    backgroundColor: "#92c4e2",
                    boxShadow: "0 0 10px #ffffff",
                  }}
                />
                <Stack
                  justifyContent={"center"}
                  height={"120px"}
                  margin="16px 4px"
                >
                  <Typography
                    color={theme.palette.text.main}
                    fontSize="1.3rem"
                    fontWeight="700"
                  >
                    {currentQuestion}
                  </Typography>
                </Stack>
                <Stack marginTop="16px" position="relative">
                  {options && (
                    <>
                      <OptionA
                        text={options["A"]}
                        onOptionSelect={handleOptionSelect}
                      />
                      <OptionB
                        text={options["B"]}
                        onOptionSelect={handleOptionSelect}
                      />
                    </>
                  )}
                </Stack>
                <Stack
                  alignItems="center"
                  position="relative"
                  margin="auto 0 48px"
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
                    <Button>
                      <Typography
                        color={"#fff"}
                        fontWeight={"500"}
                        fontSize={"14px"}
                      >
                        {totalPlayers}
                      </Typography>
                      <Typography color={"#fff"} fontSize={"12px"}>
                        Playing
                      </Typography>
                    </Button>
                    <Box onClick={() => navigate("/home")}>
                      <Button>
                        <Home sx={{ fontSize: "40px", color: "#ffffff" }} />

                      </Button>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
            </motion.div>
          )}
        </AnimatePresence>
      </Stack>
    </>
  );
};

export default Question;
