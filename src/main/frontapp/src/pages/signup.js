import {
    Box,
    Avatar,
    TextField,
    Button,
    Grid,
    Checkbox,
    FormControlLabel,
    Typography,
    createTheme,
    ThemeProvider,
    Container,
    Radio,
    RadioGroup,
} from "@mui/material";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TermsOfUse from "../components/mypage/TermsOfUse";
//=========================================================

const theme = createTheme({
    status: {
        danger: "#e53e3e",
    },
    palette: {
        primary: {
            main: "#000000",
        },
        kakao: {
            main: "#f9e100",
            contrastText: "#000",
        },
    },
});

function Signup() {
    const navigate = useNavigate();
    const [userGender, setuserGender] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const email = data.get("userEmail");
        const password = data.get("userPw");
        const password2 = data.get("userPw2");
        const name = data.get("userName");
        const phoneNumber = data.get("userPhone");
        const infoCheck = data.get("infoCheck");
        const gender = data.get("userGender");

        //========유효성 검사=====================

        // 이메일 유효성 검사
        const emailValidation = (email) => {
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            return emailRegex.test(email);
        };

        // 비밀번호 규칙 유효성 검사        
        const pwValidation = (password) => {
            const pwRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()?!])[A-Za-z\d@#$%^&*()?!]{8,}$/;
            return pwRegex.test(password);
        };
        // 이름 2~5자 유효성 검사
        const nameValidation = (name) => {
            const nameRegex = /^[가-힣]{2,5}$/;
            return nameRegex.test(name);
        };

        // 휴대폰번호 숫자만 입력하는 유효성검사
        const pnValidation = (phoneNumber) => {
            let hasNonNumeric = false; 
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

        if (!emailValidation(email)) {
            alert("올바른 이메일 형식이 아닙니다.");
            return;
        } else if (!pwValidation(password)) {
            alert(
                "비밀번호는 숫자와 영문 대소문자와 특수문자(@$!%*?&)포함 8자 이상이어야 합니다."
            );
            return;
        } else if (password !== password2) {
            alert("비밀번호 확인란과 일치하지 않습니다.");
            return;
        } else if (!pnValidation(phoneNumber)) {
            alert("유효하지 않은 휴대번호입니다.");
            return;
        } else if (!gender) {
            alert("성별을 선택하세요.");
        } else if (!nameValidation(name)) {
            alert("성함을 2글자 이상 5글자 미만으로 입력하세요.");
        } else if (!infoCheck) {
            alert("개인정보 제공에 동의해주세요.");
        } else {
            try {
                // 회원 데이터 생성을 위한 요청 본문 생성
                const memberData = {
                    userEmail: email,
                    userPw: password,
                    userGender: gender,
                    userName: name,
                    userPhone: phoneNumber,
                    // 필요한 추가 데이터는 여기에 포함시키세요
                };

                axios
                    .post("/member/create", memberData)
                    .then((response) => {
                        if (response.status === 200) {
                            alert("회원가입을 축하합니다. 로그인하세요");
                            navigate("/");
                        }
                    })
                    .catch((error) => {
                        alert("이미 등록되어있는 회원입니다.");
                    });
            } catch {
                alert("로그인을 실패하였습니다. 관리자에게 문의하십시오.");
            }
        }
    };

    return (
        <>
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    height: "1300px",
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
                        <AssignmentIndOutlinedIcon />
                    </Avatar>
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{ fontSize: 30, mt: 1 }}
                    >
                        SIGN-UP
                    </Typography>
                </Box>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    method="post"
                    id="signUp"
                    name="signUp"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {/* -------------------------------------------------------------------------------------------------------- */}
                    {/* -------------------------------------------------------------------------------------------------------- */}
                    {/* -------------------------------------------------------------------------------------------------------- */}
                    <RadioGroup
                        row
                        sx={{ mt: 2, mb: -2 }}
                        name="userGender"
                        value={userGender}
                        onChange={(e) => {
                            setuserGender(e.target.value);
                        }}
                    >
                        <FormControlLabel
                            value="f"
                            control={
                                <Radio
                                    value="f"
                                    sx={{
                                        color: "black",
                                        "&.Mui-checked": { color: "black" },
                                    }}
                                />
                            }
                            label="여성"
                        />
                        <FormControlLabel
                            value="m"
                            control={
                                <Radio
                                    value="m"
                                    sx={{
                                        color: "black",
                                        "&.Mui-checked": { color: "black" },
                                    }}
                                />
                            }
                            label="남성"
                        />
                    </RadioGroup>
                    <TextField
                        sx={{ mt: 3, width: 400 }}
                        label="이메일 주소 등록"
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
                        label="비밀번호 등록"
                        name="userPw"
                        id="userPw"
                        type="password"
                        autoComplete="current-password"
                        placeholder="8자 이상, 영문 대소문자, 숫자, 특수문자(@$!%*?&) 포함"
                        required
                        fullWidth
                    />

                    <TextField
                        sx={{ mt: 2, width: 400 }}
                        label="비밀번호 확인입력"
                        name="userPw2"
                        id="userPw2"
                        type="password"
                        autoComplete="current-password"
                        placeholder="비밀번호 등록과 동일하게 작성요망"
                        required
                        fullWidth
                    />

                    <TextField
                        sx={{ mt: 2, width: 400 }}
                        label="이름 작성"
                        name="userName"
                        id="userName"
                        type="text"
                        placeholder="성함 입력"
                        required
                        fullWidth
                    />

                    <TextField
                        sx={{ mt: 2, mb: 2, width: 400 }}
                        label="휴대번호 등록"
                        name="userPhone"
                        id="userPhone"
                        type="tel"
                        placeholder="(-)를 제외하여 입력"
                        required
                        fullWidth
                    />

                    <TermsOfUse />

                    <FormControlLabel
                        sx={{
                            alignItems: "left",
                            ml: -15.5,
                            mt: 2,
                            fontStyle: "italic",
                        }}
                        required
                        control={
                            <Checkbox
                                name="infoCheck"
                                id="infoCheck"
                                sx={{
                                    color: "black",
                                    "&.Mui-checked": { color: "black" },
                                }}
                            />
                        }
                        label="개인정보 수집 및 이용약관 동의"
                    />

                    <ThemeProvider theme={theme}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, width: 400 }}
                            color="primary"
                        >
                            클로젯 회원가입
                        </Button>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, width: 400 }}
                            color="kakao"
                        >
                            카카오톡 간편가입
                        </Button>
                    </ThemeProvider>

                    <Grid container sx={{ mt: 2, width: 400 }}>
                        <Grid item xs>
                            <Link to={"/login"}>
                                <b>로그인 하기</b>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to={"/findpw"}>
                                <b>비밀번호 찾기</b>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                <Typography
                    variant="h5"
                    sx={{ mt: 6, fontSize: 16, color: "gray" }}
                >
                    Copyright © CLOJET 2023
                </Typography>
            </Container>
        </>
    );
}

export default Signup;
