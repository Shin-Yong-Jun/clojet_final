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
import axios from "axios";

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const email = data.get("userEmail");
        const phone = data.get("userPhone");

        const emailValidation = (email) => {
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            return emailRegex.test(email);
        };

        const pnValidation = (phone) => {
            let hasNonNumeric = false;
            phone.split("").forEach((char) => {
                if (isNaN(char)) {
                    hasNonNumeric = true;
                }
            });
            if (hasNonNumeric || phone.length !== 11) {
                return false;
            }
            return true;
        };

        //=============================

        if (email && phone) {
            if (!emailValidation) {
                alert("올바른 이메일 형식이 아닙니다.");
                return;
            } else if (!pnValidation(phone)) {
                alert("유효하지 않은 휴대번호입니다.");
                return;
            } else {
                try {
                    const memberFindPw = {
                        userEmail: email,
                        userPhone: phone,
                    };

                    const response = await axios.post(
                        "/member/findPw",
                        memberFindPw
                    );

                    if (response.status === 200) {
                        const newRandomPw = response.data; // 서버 랜덤 패스워드
                        alert(
                            "임시 비밀번호 : " +
                                newRandomPw +
                                "\n임시 비밀번호로 재로그인 요망 "
                        );
                        navigate("/login");
                    }
                } catch {
                    alert("이메일 혹은 연락처를 다시 확인해주세요");
                }
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
                <Typography
                    component="h1"
                    variant="h5"
                    sx={{ fontSize: 30, mt: 1 }}
                >
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
                    label="휴대번호 입력"
                    name="userPhone"
                    id="userPhone"
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

            <Typography
                variant="h5"
                sx={{ mt: 6, fontSize: 16, color: "gray" }}
            >
                Copyright © CLOJET 2023
            </Typography>
        </Container>
    );
}

export default Findpw;
