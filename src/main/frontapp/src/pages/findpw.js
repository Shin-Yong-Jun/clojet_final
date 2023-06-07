import {
  Box,
  Avatar,
  TextField,
  Button,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
  Container,
} from "@mui/material";
import FindReplaceOutlinedIcon from "@mui/icons-material/FindReplaceOutlined";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#000000",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

function Findpw() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const phoneNumber = data.get("phoneNumber");

    //========유효성 검사=====================

    const emailValidation = (email) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email);
    };

    const pnValidation = (phoneNumber) => {
      let hasNonNumeric = false; // 문자가 발견되었는지를 나타내는 변수
      phoneNumber.split("").forEach((char) => {
        if (isNaN(char)) {
          // 입력받은 값이 숫자가 아닌 경우
          hasNonNumeric = true; // 문자가 발견되었음을 표시
        }
      });
      if (hasNonNumeric || phoneNumber.length !== 11) {
        // 문자가 발견되었거나 숫자가 11개가 아닐 경우
        return false; // false 반환
      }
      return true; // 숫자가 11개일 경우
    };

    //=============================

    if (email && phoneNumber) {
      if (!emailValidation) {
        alert("올바른 이메일 형식이 아닙니다."); // 경고 메시지 표시
        return; // 함수 종료
      } else if (!pnValidation(phoneNumber)) {
        alert("유효하지 않은 휴대번호입니다.");
        return;
      } else {
        console.log({
          email: data.get("email"),
          password: data.get("phoneNumber"),
        });
        alert("새로운 비밀번호를 이메일로 확인해주세요.");
        navigate("/login");
      }
    } else {
      alert("이메일과 휴대번호를 모두 입력해주세요.");
    }
  };
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: "800px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Avatar
          sx={{
            width: 56,
            height: 56,
            bgcolor: "black",
          }}
        >
          <FindReplaceOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ fontSize: 30, mt: 1 }}>
          FIND PASSWORD
        </Typography>
      </Box>

      <Box
        component="form"
        method="post"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          sx={{ mt: 3, width: 400 }}
          label="이메일 주소 입력"
          name="email"
          id="email"
          type="email"
          autoComplete="email"
          autoFocus
          required
          fullWidth
        />

        <TextField
          sx={{ mt: 2, width: 400 }}
          label="휴대번호 입력"
          name="phoneNumber"
          id="phoneNumber"
          type="tel"
          placeholder="(-)를 제외하여 입력"
          required
          fullWidth
        />

        <ThemeProvider theme={theme}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, width: 400 }}
            color="primary"
          >
            신규 비밀번호 발급
          </Button>
        </ThemeProvider>
      </Box>

      <Grid container sx={{ mt: 2, width: 400 }}>
        <Grid item xs>
          <Link to={"/login"}>
            <b>로그인 하기</b>
          </Link>
        </Grid>
        <Grid item>
          <Link to={"/signup"}>
            <b>회원가입</b>
          </Link>
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ mt: 6, fontSize: 16, color: "gray" }}>
        Copyright © CLOJET 2023
      </Typography>
    </Container>
  );
}

export default Findpw;
