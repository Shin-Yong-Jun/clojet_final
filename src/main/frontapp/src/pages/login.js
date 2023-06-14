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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { stringify } from "json5";

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

//=============================
const emailValidation = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
};

const pwValidation = (password) => {
    const pwRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()?!])[A-Za-z\d@#$%^&*()?!]{8,}$/;
    return pwRegex.test(password);
};

//=============================

function Login({ setCheckLogin }) {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const email = data.get("userEmail");
        const password = data.get("userPw");

        if (email && password) {
            // 이메일 형식 검사
            if (!emailValidation(email)) {
                alert("올바른 이메일 형식이 아닙니다."); // 경고 메시지 표시
                return; // 함수 종료
            } else if (!pwValidation(password)) {
                alert(
                    "비밀번호는 숫자와 영문 대소문자와 특수문자(@$!%*?&)포함 8자 이상이어야 합니다."
                );
                return;
            } else {
                try {
                    const memberLogin = {
                        userEmail: email,
                        userPw: password,
                    };

                    const response = await axios.post(
                        "/member/login",
                        memberLogin
                    );

                    if (response.status === 200) {
                        const loginMember = response.data;
                        sessionStorage.setItem(
                            "loginMember",
                            JSON,
                            stringify(loginMember)
                        );

                        const userInfo = new XMLHttpRequest();
                        userInfo.open("GET", "/member/list", true);

                        userInfo.responseType = "json";
                        userInfo.onreadystatechange = function () {
                            if (
                                this.status === 200 &&
                                this.readyState === this.DONE
                            ) {
                                setCheckLogin({
                                    userName: userInfo.response.filter(
                                        (i) => i.userEmail === email
                                    )[0].userName,
                                    userEmail: email,
                                });
                            }
                        };

                        userInfo.send();
                        // }

                        navigate("/");
                    } else {
                        alert("로그인 정보가 올바르지 않습니다.");
                    }
                } catch (error) {
                    console.log(error);
                    alert("로그인 정보가 일치하지 않습니다.");
                }
            }
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
                    <LockOutlinedIcon />
                </Avatar>
                <Typography
                    component="h1"
                    variant="h5"
                    sx={{ fontSize: 30, mt: 1 }}
                >
                    LOGIN
                </Typography>
            </Box>

            <Box
                component="form"
                method="post"
                action={"/"}
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
                    name="userEmail"
                    id="userEmail"
                    type="email"
                    autoComplete="email"
                    autoFocus
                    required
                    fullWidth
                />

                <TextField
                    sx={{ mt: 2, width: 400 }}
                    label="비밀번호 입력"
                    name="userPw"
                    id="userPw"
                    type="password"
                    autoComplete="current-password"
                    required
                    fullWidth
                />

                {/* <FormControlLabel
          control={
            <Checkbox
              value="remember"
              sx={{ color: grey, "&.Mui-checked": { color: grey[600] } }}
            />
          }
          label="계정 기억하기"
          sx={{ ml: -32, mt: 1 }}
        /> */}

                <ThemeProvider theme={theme}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, width: 400 }}
                        color="primary"
                    >
                        로그인
                    </Button>
                </ThemeProvider>
            </Box>

            <Grid container sx={{ mt: 2, width: 400 }}>
                <Grid item xs>
                    <Link to={"/findpw"}>
                        <b>비밀번호 찾기</b>
                    </Link>
                </Grid>
                <Grid item>
                    <Link to={"/signup"}>
                        <b>회원가입</b>
                    </Link>
                </Grid>
            </Grid>

            <Typography
                variant="h5"
                sx={{ mt: 6, fontSize: 16, color: "gray" }}
            >
                Copyright © CLOJET 2023
            </Typography>
        </Container>
    );
}
export default Login;
