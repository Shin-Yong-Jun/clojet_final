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
import React from "react";
import { Link, useNavigate } from "react-router-dom";
//=========================================================
//=========================================================
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import axios from 'axios';
//=========================================================
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

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
  //=========================================================
  const [expanded, setExpanded] = React.useState("");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  //=========================================================
  const navigate = useNavigate();
  const [userGender, setuserGender] = React.useState("");

  const handleSubmit = async(e) => {
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

    const emailValidation = (email) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email);
    };

    const pwValidation = (password) => {
      const pwRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return pwRegex.test(password);
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

      if (!emailValidation(email)) {
        alert("올바른 이메일 형식이 아닙니다.");
        return;
      } else if (!pwValidation(password)) {
        alert(
          "비밀번호는 최소 8자 이상이어야 하며, 영문 대소문자, 숫자, 특수문자(@$!%*?&)를 모두 포함해야 합니다."
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
      } else if (!name) {
        alert("성함을 입력하세요.");
      } else if (!infoCheck){
        alert("개인정보 제공에 동의해주세요.")
      }
      else {
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
      
          // 회원 데이터 생성 요청
          const response = await axios.post('/member/create', memberData);
      
          // 응답 처리
          if (response.status === 200) {
            alert('회원가입을 축하합니다. 로그인하세요');
            navigate('/');
          } 
        } catch (error) {
          alert('이미 존재하는 계정입니다.');
          console.error(error);
        }
      }

  };


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const data = new FormData(e.currentTarget);
  //   const email = data.get("userEmail");
  //   const password = data.get("userPw");
  //   const password2 = data.get("userPw2");
  //   const phoneNumber = data.get("userPhone");
  //   const infoCheck = data.get("infoCheck");
  //   const Gender = data.get("userGender");

  //   //========유효성 검사=====================

  //   const emailValidation = (email) => {
  //     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  //     return emailRegex.test(email);
  //   };

  //   const pwValidation = (password) => {
  //     const pwRegex =
  //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //     return pwRegex.test(password);
  //   };

  //   const pnValidation = (phoneNumber) => {
  //     let hasNonNumeric = false; // 문자가 발견되었는지를 나타내는 변수
  //     phoneNumber.split("").forEach((char) => {
  //       if (isNaN(char)) {
  //         // 입력받은 값이 숫자가 아닌 경우
  //         hasNonNumeric = true; // 문자가 발견되었음을 표시
  //       }
  //     });
  //     if (hasNonNumeric || phoneNumber.length !== 11) {
  //       // 문자가 발견되었거나 숫자가 11개가 아닐 경우
  //       return false; // false 반환
  //     }
  //     return true; // 숫자가 11개일 경우
  //   };

  //   //=============================

  //     if (!emailValidation(email)) {
  //       alert("올바른 이메일 형식이 아닙니다.");
  //       return;
  //     } else if (!pwValidation(password)) {
  //       alert(
  //         "비밀번호는 최소 8자 이상이어야 하며, 영문 대소문자, 숫자, 특수문자(@$!%*?&)를 모두 포함해야 합니다."
  //       );
  //       return;
  //     } else if (password !== password2) {
  //       alert("비밀번호 확인란과 일치하지 않습니다.");
  //       return;
  //     } else if (!pnValidation(phoneNumber)) {
  //       alert("유효하지 않은 휴대번호입니다.");
  //       return;
  //     } else if (!Gender) {
  //       alert("성별을 선택하세요.");
  //     } else if (!infoCheck){
  //       alert("개인정보 제공에 동의해주세요.")
  //     }
  //     else {
  //       alert("회원가입을 축하합니다. 로그인하세요")
  //       console.log({
  //         email: data.get("userEmail"),
  //         password: data.get("userPw"),
  //         password2: data.get("userPw2"),
  //         phoneNumber: data.get("userPhone"),
  //         infoCheck: data.get("infoCheck"),
  //         Gender: data.get("userGender"),
  //       });
  //       navigate("/");
  //     }

  // };

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
          <Typography component="h1" variant="h5" sx={{ fontSize: 30, mt: 1 }}>
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
          <RadioGroup row sx={{ mt: 2, mb: -2 }} 
          name="userGender" 
          value={userGender}
          onChange={(e)=> {setuserGender(e.target.value)}}>
            <FormControlLabel
              value="f"
              control={
                <Radio
                  value="f"
                  sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                />
              }
              label="여성"
            />
            <FormControlLabel
              value="m"
              control={
                <Radio
                  value="m"
                  sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
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

          <div>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>개인정보 수집동의</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{
                    height: 300,
                    display: "inline-block",
                    overflow: "auto",
                  }}
                  className="agreeterm"
                >
                  <strong>제1조 목적</strong>
                  <br />
                  <br />
                  표준약관 제10023호
                  <br />
                  <br />
                  이 약관은 클로젯. 회사(전자거래 사업자)가 운영하는 클로젯
                  브랜드 몰(이하 &quot;몰&quot;이라 한다)에서 제공하는 인터넷
                  관련 서비스(이하 &quot;서비스&quot;라 한다)를 이용함에 있어
                  사이버몰과 이용자의 권리&middot;의무 및 책임사항을 규정함을
                  목적으로 합니다.
                  <br />
                  <br />
                  *「PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에
                  반하지 않는 한 이 약관을 준용합니다」
                  <br />
                  <br />
                  <strong>제2조 정의</strong>
                  <br />
                  <br />
                      ① &quot;몰&quot;이란 클로젯. 회사가 재화 또는 용역을
                  이용자에게 제공하기 위하여 컴퓨터등 정보통신설비를 이용하여
                  재화 또는 용역을 거래할 수 있도록 설정한 가상의 영업장을
                  말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도
                  사용합니다.
                  <br />
                  <br />
                      ② &quot;이용자&quot;란 &quot;몰&quot;에 접속하여 이 약관에
                  따라 &quot;몰&quot;이 제공하는 서비스를 받는 회원 및 비회원을
                  말합니다.
                  <br />
                  <br />
                      ③ &lsquo;회원&rsquo;이라 함은 &quot;몰&quot;에 개인정보를
                  제공하여 회원등록을 한 자로서, &quot;몰&quot;의 정보를
                  지속적으로 제공받으며, &quot;몰&quot;이 제공하는 서비스를
                  계속적으로 이용할 수 있는 자를 말합니다.
                  <br />
                  <br />
                      ④ &lsquo;비회원&rsquo;이라 함은 회원에 가입하지 않고
                  &quot;몰&quot;이 제공하는 서비스를 이용하는 자를 말합니다.
                  <br />
                  <br />
                  <strong>제3조 약관의 명시와 설명 및 개정</strong>
                  <br />
                  <br />
                      ① &ldquo;몰&rdquo;은 이 약관의 내용과 상호 및 대표자 성명,
                  영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를
                  포함), 전화번호, 모사전송번호, 전자우편주소, 사업자등록번호,
                  통신판매업신고번호, 개인정보관리책임자 등을 이용자가 쉽게 알
                  수 있도록 &ldquo;몰&rdquo;의 초기 서비스화면(전면)에
                  게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼
                  수 있도록 할 수 있습니다.
                  <br />
                  <br />
                      ② &ldquo;몰&rdquo;은 이용자가 약관에 동의하기에 앞서
                  약관에 정하여져 있는 내용 중 청약철회, 배송책임, 환불조건 등과
                  같은 중요한 내용을 이용자가 이해할 수 있도록 별도의 연결화면
                  또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.
                  <br />
                  <br />
                      ③ &ldquo;몰&rdquo;은 전자상거래 등에서의 소비자보호에 관한
                  법률, 약관의 규제에 관한 법률, 전자문서 및 전자거래 기본법,
                  전자서명법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률,
                  방문판매 등에 관한 법률 등 관련법을 위배하지 않는 범위에서 이
                  약관을 개정할 수 있습니다.
                  <br />
                  <br />
                      ④ &ldquo;몰&rdquo;이 약관을 개정할 경우에는 적용일자 및
                  개정사유를 명시하여 현행약관과 함께 &ldquo;몰&rdquo;의
                  초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지
                  공지합니다. 다만, 이용자에게 불리하게 약관내용을 변경하는
                  경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다.
                  이 경우 &quot;몰&ldquo;은 개정전 내용과 개정후 내용을 명확하게
                  비교하여 이용자가 알기 쉽도록 표시합니다.
                  <br />
                  <br />
                      ⑤ &ldquo;몰&rdquo;이 약관을 개정할 경우에는 그 개정약관은
                  그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미
                  체결된 계약에 대해서는 개정전의 약관조항이 그대로 적용됩니다.
                  다만 이미 계약을 체결한 이용자가 개정약관 조항의 적용을 받기를
                  원하는 뜻을 제4항에 의한 개정약관의 공지기간내에
                  &ldquo;몰&ldquo;에 송신하여 &rdquo;몰&ldquo;의 동의를 받은
                  경우에는 개정약관 조항이 적용됩니다.
                  <br />
                  <br />
                      ⑥ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에
                  관하여는 전자상거래등에서의 소비자보호에관한법률,
                  약관의규제등에관한법률, 공정거래위원회가 정하는
                  전자상거래등에서의 소비자보호지침 및 관계법령 또는 상관례에
                  따릅니다.
                  <br />
                  <br />                                       
                  <strong>제4조 서비스의 제공 및 변경</strong>
                  <br />
                  <br />
                      ① &ldquo;몰&rdquo;은 다음과 같은 업무를 수행합니다.
                  <br />
                  <br />
                      1. 재화 등에 대한 정보 제공 및 구매계약의 체결
                  <br />
                  <br />
                      2. 구매계약이 체결된 재화 등의 배송
                  <br />
                  <br />
                      3. 기타 &ldquo;몰&rdquo;이 정하는 업무
                  <br />
                  <br />
                      ② &ldquo;몰&rdquo;은 재화 등의 품절, 기술적 사양의 변경,
                  불가피한 여건 및 사정이 발생 등의 경우에는 제공할 재화 등의
                  내용을 변경할 수 있습니다. 이 경우에는 변경된 재화 등의 내용
                  및 제공일자를 공지합니다.
                  <br />
                  <br />
                      ③ &ldquo;몰&rdquo;이 제공하기로 이용자와 계약을 체결한
                  서비스의 내용을 재화 등의 품절 또는 기술적 사양의 변경 등의
                  사유로 변경할 경우에는 그 사유를 이용자에게 통지 가능한 주소로
                  즉시 통지합니다.
                  <br />
                  <br />
                      ④ 전항의 경우 &ldquo;몰&rdquo;은 이로 인하여 이용자가 입은
                  손해를 배상합니다. 다만, &ldquo;몰&rdquo;이 고의 또는 과실이
                  없음을 입증하는 경우에는 그러하지 아니합니다.
                  <br />
                  <br />
                      ⑤ 해외상품 등 회사 외 판매회원이 판매하는 상품의 경우
                  &ldquo;몰&rdquo;은 정보 제공 및 구매계약 체결을 위한 통신판매
                  중개서비스만을 제공하는 통신판매중개업자이며, 재화 등의 배송,
                  회수, 고객상담 및 불만처리, 수입 및 통관 관련 업무, 국제 반송
                  관련 업무 등은 &ldquo;몰&rdquo;이 아닌 판매회원 이 제공합니다.
                  <br />
                  <br />
                  <strong>제5조 서비스의 중단</strong>
                  <br />
                  <br />
                      ① &ldquo;몰&rdquo;은 컴퓨터 등 정보통신설비의 보수점검,
                  교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의
                  제공을 일시적으로 중단할 수 있습니다.
                  <br />
                  <br />
                      ② &ldquo;몰&rdquo;은 제1항의 사유로 서비스의 제공이
                  일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에
                  대하여 배상합니다. 단, &ldquo;몰&rdquo;이 고의 또는 과실이
                  없음을 입증하는 경우에는 그러하지 아니합니다.
                  <br />
                  <br />
                      ③ 사업종목의 전환, 사업의 포기, 업체간의 통합 등의 이유로
                  서비스를 제공할 수 없게 되는 경우에는 &ldquo;몰&rdquo;은
                  이용자에게 통지하고, &ldquo;몰&rdquo;에서 별도로 제시한
                  보상규정 및 기준에 따라 이용자에게 보상합니다. 다만,
                  &ldquo;몰&rdquo;이 보상기준 등을 고지하지 아니한 경우에는
                  이용자들의 포인트 또는 적립금 등을 &ldquo;몰&rdquo;에서
                  통용되는 통화가치에 상응하는 현물 또는 현금으로 이용자에게
                  지급합니다.
                  <br />
                  <br />
                  <strong>제6조 회원가입</strong>
                  <br />
                  <br />
                      ① 이용자는 &ldquo;몰&rdquo;이 정한 가입 양식에 따라
                  회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서
                  회원가입을 신청합니다.
                  <br />
                  <br />
                      ② &ldquo;몰&rdquo;은 제1항과 같이 회원으로 가입할 것을
                  신청한 이용자 중 다음 각호에 해당하지 않는 한 회원으로
                  등록합니다.
                  <br />
                  <br />
                      1. 가입신청자가 이 약관 제7조제3항에 의하여 이전에
                  회원자격을 상실한 적이 있는 경우, 다만 제7조제3항에 의한
                  회원자격 상실 후 5년이 경과한 자로서 &ldquo;몰&rdquo;의
                  회원재가입 승낙을 얻은 경우에는 예외로 한다.
                  <br />
                  <br />
                      2. 등록 내용에 허위, 기재누락, 오기가 있는 경우
                  <br />
                  <br />
                      3. 회원 가입일 현재 만 14세 미만인 경우
                  <br />
                  <br />
                      4. 기타 회원으로 등록하는 것이 &ldquo;몰&rdquo;의 기술상
                  현저히 지장이 있다고 판단되는 경우
                  <br />
                  <br />
                      5. 회원이 자발적인 의사로 회원탈퇴를 한 후 2개월이 지나지
                  아니한 경우
                  <br />
                  <br />
                      ③ 회원가입계약의 성립시기는 &ldquo;몰&rdquo;의 승낙이
                  회원에게 도달한 시점으로 합니다.
                  <br />
                  <br />
                      ④ 회원은 제19조 제1항에 의한 등록사항에 변경이 있는 경우,
                  즉시 전자우편 기타 방법으로 &ldquo;몰&rdquo;에 대하여 그
                  변경사항을 통지하여야 하며, 이를 이행하지 않아 발생한 불이익은
                  회사가 부담하지 않습니다.
                  <br />
                  <br />
                      ⑤ 비회원 이용자의 경우에도 회원에게 적용되는 사항을 제외한
                  나머지 부분에 대해서는 회원과 동일하게 이 약관이 적용됩니다.
                  <br />
                  <br />
                  <strong>제7조 회원 탈퇴 및 자격 상실 등</strong>
                  <br />
                  <br />
                      ① 회원은 &ldquo;몰&rdquo;에 언제든지 탈퇴를 요청할 수
                  있으며 &ldquo;몰&rdquo;은 즉시 회원탈퇴를 처리합니다. 다만
                  이미 체결된 거래계약의 완결이 필요한 경우에는 이 약관이 계속
                  적용됩니다.
                  <br />
                  <br />
                      ② 회원이 다음 각호의 사유에 해당하는 경우,
                  &ldquo;몰&rdquo;은 회원자격을 제한 및 정지시킬 수 있습니다.
                  <br />
                  <br />
                      . 가입 신청시에 허위 내용을 등록한 경우
                  <br />
                  <br />
                      2. &ldquo;몰&rdquo;을 이용하여 구입한 재화 등의 대금, 기타
                  &ldquo;몰&rdquo; 이용에 관련하여 회원이 부담하는 채무를 기일에
                  지급하지 않는 경우
                  <br />
                  <br />
                      3. 제3자의 &ldquo;몰&rdquo; 이용을 방해하거나 그 정보를
                  도용하는 등 전자상거래 질서를 위협하는 경우
                  <br />
                  <br />
                      4. &ldquo;몰&rdquo;을 이용하여 법령 또는 이 약관이
                  금지하거나 공서양속에 반하는 행위를 하는 경우
                  <br />
                  <br />
                      5. &ldquo;몰&rdquo;의 서비스 제공과 관련 또는 제3자에 대한
                  근거 없이 허위의 사실을 적시하거나 유포하여 회사 또는 제3자의
                  의 명예를 실추시키거나 회사의 신뢰성을 해하는 경우
                  <br />
                  <br />
                      6. 서비스의 이용과정에서 회사의 직원에게 폭언, 협박 또는
                  음란한 언행 등 부적절한 방법으로 회사의 업무를 방해하는 경우
                  <br />
                  <br />
                      7. 재화 등을 구매한 후 정당한 이유 없이 상습적으로 취소,
                  교환 및 반품하여 회사의 업무를 방해하는 경우
                  <br />
                  <br />
                      ③ 회원이 다음 각호의 사유에 해당하는 경우,
                  &ldquo;몰&rdquo;은 회원자격을 상실시킬 수 있습니다.
                  <br />
                  <br />
                      1. &ldquo;몰&rdquo;이 회원 자격을 제한, 정지시킨 후,
                  동일한 행위가 2회 이상 반복되거나 30일 이내에 그 사유가
                  시정되지 아니하는 경우
                  <br />
                  <br />
                      2. 상품 재판매 등의 목적으로 대량으로 재화 등을 구매하여
                  건전한 상거래 질서를 해하는 경우
                  <br />
                  <br />
                      ④ &ldquo;몰&rdquo;이 회원자격을 상실시키는 경우에는
                  회원에게 이를 통지하고, 최소한 30일 이상의 기간을 정하여
                  소명할 기회를 부여합니다.
                  <br />
                  <br />
                      ⑤ 몰 회원이 1년 이상 몰 사이트에 로그인하지 않는 경우 해당
                  회원의 계정은 휴면계정으로 전환되며 이후 다시 서비스를
                  이용하고자 할 경우 로그인 등 확인절차를 거쳐야 합니다.
                  <br />
                  <br />
                  <strong>제8조 회원에 대한 통지</strong>
                  <br />
                  <br />
                      ① &ldquo;몰&rdquo;이 회원에 대한 통지를 하는 경우, 회원
                  가입시 등록한 전자우편 주소 또는 전화번호로 할 수 있습니다.
                  <br />
                  <br />
                      ② &ldquo;몰&rdquo;은 불특정다수 회원에 대한 통지의 경우
                  1주일이상 &ldquo;몰&rdquo;에 게시함으로서 개별 통지에 갈음할
                  수 있습니다. 다만, 회원 본인의 거래와 관련하여 중대한 영향을
                  미치는 사항에 대하여는 개별통지를 합니다.
                  <br />
                  <br />
                  <strong>제9조 구매신청</strong>
                  <br />
                  <br />
                      &ldquo;몰&rdquo; 이용자는 &ldquo;몰&rdquo; 상에서 다음
                  또는 이와 유사한 방법에 의하여 구매를 신청하며,
                  &ldquo;몰&rdquo;은 이용자가 구매신청을 함에 있어서 다음의 각
                  내용을 알기 쉽게 제공하여야 합니다.
                  <br />
                  <br />
                      단, 회원인 경우 제2호 내지 제4호의 적용을 제외할 수
                  있습니다.
                  <br />
                  <br />
                      1. 재화 등의 검색 및 선택
                  <br />
                  <br />
                      2. 성명, 주소, 전화번호, 전자우편주소(또는 이동전화번호)
                  등의 입력
                  <br />
                  <br />
                      3. 약관내용, 청약철회권이 제한되는 서비스, 배송료, 설치비
                  등의 비용부담과 관련한 내용에 대한 확인
                  <br />
                  <br />
                      4. 이 약관에 동의하고 위 3.호의 사항을 확인하거나 거부하는
                  표시(예, 마우스 클릭)
                  <br />
                  <br />
                      5. 재화 등의 구매신청 및 이에 관한 확인 또는
                  &ldquo;몰&rdquo;의 확인에 대한 동의
                  <br />
                  <br />
                      6. 결제방법의 선택
                  <br />
                  <br />
                  <strong>제10조 계약의 성립</strong>
                  <br />
                  <br />
                      ① &ldquo;몰&rdquo;은 제9조와 같은 구매신청에 대하여 다음
                  각호에 해당하면 승낙하지 않을 수 있습니다. 다만, 미성년자와
                  계약을 체결하는 경우에는 법정대리인의 동의를 얻지 못하면
                  미성년자 본인 또는 법정대리인이 당해 계약을 취소할 수
                  있습니다.
                  <br />
                  <br />
                      1. 신청 내용에 허위, 기재누락, 오기가 있는 경우
                  <br />
                  <br />
                      2. 미성년자가 담배, 주류 등 청소년보호법에서 금지하는 재화
                  등을 구매하는 경우
                  <br />
                  <br />
                      3. 기타 구매신청에 승낙하는 것이 &ldquo;몰&rdquo; 기술상
                  현저히 지장이 있다고 판단하는 경우
                  <br />
                  <br />
                      4. 구매신청 고객이 회원자격 제한, 정지, 상실된 회원으로
                  확인된 경우
                  <br />
                  <br />
                      5. 동일한 아이디로 동일한 상품을 수회 반복 주문하여 상거래
                  질서를 해한다고 판단된 경우
                  <br />
                  <br />
                      6. 여러 개의 아이디로 주문한 동일 상품을 동일 주소로 배송
                  요청하는 경우 등 상거래 질서를 해한다고 판단되는 경우
                  <br />
                  <br />
                      7. 이용자가 해외상품을 자가 소비용 외의 목적으로
                  구매신청한 것으로 판단되는 경우
                  <br />
                  <br />
                      8. 정상적인 상거래 질서를 해할 수 있는 재판매 목적, 기타
                  부정한 방법으로 구매신청을 한 경우
                  <br />
                  <br />
                      ② &ldquo;몰&rdquo;의 승낙이 수신확인통지형태로 이용자에게
                  도달한 시점에 계약이 성립한 것으로 봅니다.
                  <br />
                  <br />
                      ③ &ldquo;몰&rdquo;의 승낙의 의사표시에는 이용자의 구매
                  신청에 대한 확인 및 판매가능 여부, 구매신청의 정정 취소 등에
                  관한 정보 등을 포함하여야 합니다.
                  <br />
                  <br />
                      ④ 계약이 성립한 후 &ldquo;몰&rdquo;은 제1항의 각호를
                  발견한 경우 &ldquo;몰&rdquo;은 즉시 계약을 취소할 수
                  있으며,계약 취소시 이용자가 결제한 상품 대금은 즉시
                  환불처리됩니다.
                  <br />
                  <br />
                  <strong>제11조 대금지급방법</strong>
                  <br />
                  <br />
                      &ldquo;몰&rdquo;에서 구매한 재화 등에 대한 대금지급방법은
                  다음 각호의 방법중 가용한 방법으로 할 수 있습니다. 단,
                  &ldquo;몰&rdquo;은 재화 등의 종류에 따라 일부 대금지급방법의
                  이용에 제한이 있을 수 있습니다.
                  <br />
                  <br />
                      1. 폰뱅킹, 인터넷뱅킹 등의 각종 계좌이체
                  <br />
                  <br />
                      2. 선불카드, 직불카드, 신용카드 등의 각종 카드 결제
                  <br />
                  <br />
                      3. 온라인무통장입금
                  <br />
                  <br />
                      4. 전자화폐에 의한 결제
                  <br />
                  <br />
                      5. 수령시 대금지급
                  <br />
                  <br />
                      6. 포인트, 적립금 등 &ldquo;몰&rdquo;이 지급한 수단에 의한
                  결제
                  <br />
                  <br />
                      7. &ldquo;몰&rdquo;과 계약을 맺었거나 &ldquo;몰&rdquo;이
                  인정한 상품권에 의한 결제
                  <br />
                  <br />
                      8. 기타 전자적 지급 방법에 의한 대금 지급 등<br />
                  <br />
                  <strong>제12조 수신확인통지, 구매신청 변경 및 취소</strong>
                  <br />
                  <br />
                      ① &ldquo;몰&rdquo;은 이용자의 구매신청이 있는 경우
                  이용자에게 수신확인통지를 합니다.
                  <br />
                  <br />
                      ② 수신확인통지를 받은 이용자는 의사표시의 불일치 등이 있는
                  경우에는 수신확인통지를 받은 후 즉시 구매신청 변경 및 취소를
                  요청할 수 있고 &ldquo;몰&rdquo;은 배송전에 이용자의 요청이
                  있는 경우에는 지체없이 그 요청에 따라 처리하여야 합니다. 다만
                  이미 대금을 지불한 경우에는 제15조의 청약철회 등에 관한 규정에
                  따릅니다.
                  <br />
                  <br />
                  <strong>제13조 재화 등의 공급</strong>
                  <br />
                  <br />
                      ① &ldquo;몰&rdquo;은 이용자와 재화 등의 공급시기에 관하여
                  별도의 약정이 없는 이상, 이용자가 청약을 한 날부터 7일 이내에
                  재화 등을 배송할 수 있도록 주문제작, 포장 등 기타의 필요한
                  조치를 취합니다. 다만, &ldquo;몰&rdquo;이 이미 재화 등의
                  대금의 전부 또는 일부를 받은 경우에는 대금의 전부 또는 일부를
                  받은 날부터 3영업일 이내에 조치를 취합니다. 이때
                  &ldquo;몰&rdquo;은 이용자가 재화 등의 공급 절차 및 진행 사항을
                  확인할 수 있도록 적절한 조치를 합니다.
                  <br />
                  <br />
                      ② &ldquo;몰&rdquo;은 이용자가 구매한 재화에 대해 배송수단,
                  수단별 배송비용 부담자, 수단별 배송기간 등을 명시합니다. 만약
                  &ldquo;몰&rdquo;이 약정 배송기간을 초과한 경우에는 그로 인한
                  이용자의 손해를 배상합니다. 다만 &ldquo;몰&rdquo;이 고의,
                  과실이 없음을 입증한 경우에는 그러하지 아니합니다.
                  <br />
                  <br />
                      ③ &ldquo;몰&rdquo; 또는 &ldquo;판매회원&rdquo;은 이용자가
                  구매 신청한 재화 등에 대해서 동일성 여부 및 하자∙파손 여부,
                  운송물이 수출입 법령 등에 저촉되지 않는지 여부 등의 확인을
                  위해 해당 운송물의 개봉∙검수를 할 수 있습니다.
                  &ldquo;몰&rdquo; 또는 &ldquo;판매회원&rdquo;은 검수의 기준 및
                  범위를 정하여 이용자에게 미리 통지합니다.
                  <br />
                  <br />
                      ④ &ldquo;몰&rdquo; 또는 &ldquo;판매회원&rdquo;이 재화 등의
                  하자, 파손 등을 발견한 경우, 이용자에게 이를 통보하고 이용자의
                  요청에 따라 게약을 해제 또는 해지, 청약철회(이하
                  &ldquo;청약철회 등&rdquo;)하거나, 재화 등의 인도를 진행합니다.
                  <br />
                  <br />
                      ⑤ 이용자가 복수의 재화 등을 구매하고, 각 재화 등을
                  공급하는 해외사업자가 다를 경우 해당 재화 등을 판매회원의 해외
                  수령 장소에 도착하는 순서대로 배송할 수 있습니다.
                  <br />
                  <br />
                      ⑥ &ldquo;판매회원&rdquo;은 이용자를 위하여 운송 및 통관
                  업무 등 통관절차를 수행할 수 있습니다. 이 때 발생하는
                  관∙부가세 등은 이용자 또는 수하인이 부담합니다.
                  <br />
                  <br />
                      ⑦ &ldquo;몰&rdquo; 또는 &ldquo;판매회원&rdquo;은 재화 등에
                  관하여 이용자의 책임 있는 사유로 인하여 관할관청 등의
                  관련법령에 근거한 적법한 인도 요구가 있는 경우 해당 재화 등을
                  관할 기관에 인도합니다. 이 경우 &ldquo;몰&rdquo; 또는
                  &ldquo;판매회원&rdquo;은 지체없이 이를 이용자에게 통지합니다.
                  <br />
                  <br />
                      ⑧ 이용자가 구매한 재화 등에 대하여
                  &ldquo;판매회원&rdquo;과 해외사업자간에 매매계약이 체결되어
                  해당 재화가 &ldquo;판매회원&rdquo;의 해외 현지 수령 장소로
                  발송된 이후 이용자가 청약철회 등을 한 경우, 해외 현지 운송료
                  및 구매 수수료, 해외 현지 반송료는 이용자가 부담합니다. 이
                  경우 &ldquo;판매회원&rdquo;은 이용자에게 해당 매매계약이
                  체결된 일시 및 발송의 일시를 증빙하는 자료를 제시합니다.
                  <br />
                  <br />
                  <strong>제14조 환급</strong>
                  <br />
                  <br />
                      &ldquo;몰&rdquo;은 이용자가 구매신청한 재화 등이 품절 등의
                  사유로 인도 또는 제공을 할 수 없을 때에는 지체없이 그 사유를
                  이용자에게 통지하고 사전에 재화 등의 대금을 받은 경우에는
                  대금을 받은 날부터 3영업일 이내에 환급하거나 환급에 필요한
                  조치를 취합니다.
                  <br />
                  <br />
                  <strong>제15조 청약철회 등</strong>
                  <br />
                  <br />
                      ① &ldquo;몰&rdquo;과 재화 등의 구매에 관한 계약을 체결한
                  이용자는 수신확인의 통지를 받은 날부터 7일 이내에는 청약의
                  철회를 할 수 있습니다.
                  <br />
                  <br />
                      ② 이용자는 재화 등을 배송받은 경우 다음 각호의 1에
                  해당하는 경우에는 반품 및 교환을 할 수 없습니다.
                  <br />
                  <br />
                      1. 이용자에게 책임 있는 사유로 재화 등이 멸실 또는 훼손된
                  경우(다만, 재화 등의 내용을 확인하기 위하여 포장 등을 훼손한
                  경우에는 청약철회를 할 수 있습니다)
                  <br />
                  <br />
                      2. 이용자의 사용 또는 일부 소비에 의하여 재화 등의 가치가
                  현저히 감소한 경우
                  <br />
                  <br />
                      3. 시간의 경과에 의하여 재판매가 곤란할 정도로 재화 등의
                  가치가 현저히 감소한 경우
                  <br />
                  <br />
                      4. 같은 성능을 지닌 재화 등으로 복제가 가능한 경우 그
                  원본인 재화 등의 포장을 훼손한 경우
                  <br />
                  <br />
                      5. &ldquo;몰&rdquo;이 이용자의 주문에 의하여 개별적으로
                  재화 등을 생산하는 경우 등으로서 청약철회 및 교환의 제한에
                  관해 사전에 고지한 경우
                  <br />
                  <br />
                      ③ 제2항 제2호 내지 제4호의 경우에 &ldquo;몰&rdquo;이
                  사전에 청약철회 등이 제한되는 사실을 소비자가 쉽게 알 수 있는
                  곳에 명기하거나 시용상품을 제공하는 등의 조치를 하지 않았다면
                  이용자의 청약철회 등이 제한되지 않습니다.
                  <br />
                  <br />
                      ④ 이용자는 제1항 및 제2항의 규정에 불구하고 재화 등의
                  내용이 표시&bull;광고 내용과 다르거나 계약내용과 다르게 이행된
                  때에는 당해 재화 등을 공급받은 날부터 3월이내, 그 사실을 안 날
                  또는 알 수 있었던 날부터 30일 이내에 청약철회 등을 할 수
                  있습니다.
                  <br />
                  <br />
                  <strong>제16조 청약철회 등의 효과</strong>
                  <br />
                  <br />
                      ① &ldquo;몰&rdquo;은 이용자로부터 재화 등을 반환받은 경우
                  3영업일 이내에 이미 지급받은 재화 등의 대금을 환급합니다. 이
                  경우 &ldquo;몰&rdquo;이 이용자에게 재화 등의 환급을 지연한
                  때에는 그 지연기간에 대하여
                  전자상거래등에서의소비자보호에관한법률시행령이 정하는
                  지연이자율을 곱하여 산정한 지연이자를 지급합니다.
                  <br />
                  <br />
                      ② &ldquo;몰&rdquo;은 위 대금을 환급함에 있어서 이용자가
                  신용카드 또는 전자화폐 등의 결제수단으로 재화 등의 대금을
                  지급한 때에는 지체없이 당해 결제수단을 제공한 사업자로 하여금
                  재화 등의 대금의 청구를 정지 또는 취소하도록 요청합니다.
                  <br />
                  <br />
                      ③ 청약철회 등의 경우 공급받은 재화 등의 반환에 필요한
                  비용은 이용자가 부담합니다. &ldquo;몰&rdquo;은 이용자에게
                  청약철회 등을 이유로 위약금 또는 손해배상을 청구하지 않습니다.
                  다만 재화 등의 내용이 표시&bull;광고 내용과 다르거나
                  계약내용과 다르게 이행되어 청약철회 등을 하는 경우 재화 등의
                  반환에 필요한 비용은 &ldquo;몰&rdquo;이 부담합니다.
                  <br />
                  <br />
                      ④ 이용자가 재화 등을 제공받을 때 발송비를 부담한 경우에
                  &ldquo;몰&rdquo;은 청약철회시 그 비용을 누가 부담하는지를
                  이용자가 알기 쉽도록 명확하게 표시합니다.
                  <br />
                  <br />
                      ⑤ 이용자로부터 반환 받은 재화 등이 이미 일부 사용 또는
                  소비된 경우에는 &ldquo;몰&rdquo;은 그 재화 등의 사용 또는 일부
                  소비에 의하여 이용자가 얻은 이익 또는 그 재화 등의 공급에
                  소요된 비용에 상당하는 금액을 이용자에게 청구할 수 있습니다.
                  <br />
                  <br />
                  <strong>제17조 결제대금 보호서비스</strong>
                  <br />
                  <br />
                      ① &ldquo;몰&rdquo;은
                  전자상거래등에서의소비자보호에관한법률에 의거 선불식으로
                  판매하는 상품 (정보통신망에 의해 전송되거나 제3자가 배송을
                  확인할 수 없는 상품 및 일정기간 분할되어 공급하는 상품 제외)의
                  결제건 중 카드 및 적립금을 제외한 결제수단을 이용하여 결제된
                  건에 대해 거래의 안전성을 보장하는 소비자피해보상보험계약 등
                  (채무지급보증계약 포함)을 운영합니다.
                  <br />
                  <br />
                      ② &ldquo;몰&rdquo;이 고의 또는 불가항력적으로 채무
                  지급불능 상태에 빠져 상기 결제 건을 행한 이용자에 대해 상품
                  공급의무를 불이행하거나 상품 배송 전 취소 또는 상품을 공급한
                  날로부터 7일 이내에 청약철회에 따른 대금환급 의무를 불이행할
                  경우 이용자는 회사와 소비자피해보상보험계약 등이 체결된
                  금융기관에 회사와의 거래사실을 입증할 수 있는 증빙을 서면으로
                  제출하여 결제 대금을 청구할 수 있습니다.
                  <br />
                  <br />
                  <strong>제18조 포인트, 쿠폰 제도의 운영</strong>
                  <br />
                  <br />
                      ① &ldquo;몰&rdquo;은 회원에게 포인트, 쿠폰 제도를 운영할
                  수 있습니다.
                  <br />
                  <br />
                      ② 포인트는 &ldquo;몰&rdquo;이 회원에게 재화 등을 구매시
                  또는 이벤트 참여시 경품 등 &ldquo;몰&rdquo;의 정책에 따라
                  부여하는 결제수단을 말합니다.
                  <br />
                  <br />
                      ③ 쿠폰은 &ldquo;몰&rdquo;의 정책에 따라 일정액 또는
                  일정비율을 할인 받을 수 있는 수단을 말합니다.
                  <br />
                  <br />
                      ④ 포인트, 쿠폰의 획득, 사용 방법 등에 관련된
                  세부이용지침은 서비스에 따라 별도로 마련하여 고지한 절차 또는
                  세칙에 따릅니다.
                  <br />
                  <br />
                      ⑤ 포인트, 쿠폰은 재화 등을 구매시 단독으로 (쿠폰 제외)
                  또는 다른 결제수단과 결합하여 사용할 수 있으나, 사전에
                  &ldquo;몰&rdquo;이 사용이 불가능하다고 고지한 재화 등에
                  대해서는 사용을 할 수 없습니다.
                  <br />
                  <br />
                      ⑥ 이용자는 포인트, 쿠폰을 본인의 거래에 한하여 이용할 수
                  있으며, 타인에게 매매 또는 양도 등의 행위를 할 수 없습니다.
                  <br />
                  <br />
                      ⑦ 이용자가 부당 또는 부정한 방법으로 포인트, 쿠폰을
                  취득하거나 사용한 사실이 확인될 경우 이용자는 이를 사용할 수
                  없으며 이로 인해 발생하는 모든 법률적인 책임을 부담합니다. 이
                  경우 &ldquo;몰&rdquo;은 이용자의 포인트, 쿠폰의 회수,
                  회원자격의 상실 및 형사 고발 등 기타 필요한 조치를 취할 수
                  있습니다.
                  <br />
                  <br />
                      ⑧ 적립된 &rdquo;포인트&rdquo;는 최종 구매일로부터 2년간
                  거래 실적이 없는 경우 소멸되며, 소멸된 &rdquo;포인트&rdquo;는
                  복구가 불가합니다.
                  <br />
                  <br />
                      ⑨ &quot;회사&quot;는 ＂포인트＂ 적립, 사용 방법 등에
                  관련된 세부이용정책을 개별적으로 시행할 수 있으며, ＂회원＂은
                  그 정책에 따라야 합니다.
                  <br />
                  <br />
                      ＂회사＂가 상이한 시기와 발생 원인에 따라서 ＂회원＂에게
                  &rdquo;포인트＂를 부여하여 ＂회원＂이 합산된 ＂포인트＂ 중
                  일부를 사용할 경우 ＂포인트&quot;의 차감 순서나 소멸시효 기간
                  등은 &quot;회사&quot;가 결정하여 공지합니다.
                  <br />
                  <br />
                  <strong>제19조 개인정보보호</strong>
                  <br />
                  <br />
                      ① &ldquo;몰&rdquo;은 이용자의 개인정보 수집시 서비스제공을
                  위하여 필요한 범위에서 최소한의 개인정보를 수집하며, 개인정보
                  처리방침에 따라 엄격히 관리합니다.
                  <br />
                  <br />
                      ② 회사는 개인정보 처리방침을 &ldquo;몰&rdquo;하단에 링크
                  등의 방법으로 게시하여 이용자가 손쉽게 조회하여 볼 수 있도록
                  제공합니다.
                  <br />
                  <br />
                      ③ &ldquo;몰&rdquo;은 이용자의 개인정보를
                  수집&bull;이용하는 때에는 당해 이용자에게 그 목적을 고지하고
                  동의를 받습니다.
                  <br />
                  <br />
                      ④ &ldquo;몰&rdquo;은 수집된 개인정보를 목적 외의 용도로
                  이용할 수 없으며, 새로운 이용목적이 발생한 경우 또는 제3자에게
                  제공하는 경우에는 이용&bull;제공단계에서 당해 이용자에게 그
                  목적을 고지하고 동의를 받습니다. 다만, 관련 법령에 달리 정함이
                  있는 경우에는 예외로 합니다.
                  <br />
                  <br />
                      ⑤ &ldquo;몰&rdquo;이 개인정보 수집 및 이용과 관련하여
                  이용자의 동의를 받아야 하는 경우에는 개인정보 수집 이용의
                  목적, 수집하는 개인정보의 항목, 개인정보의 보유 및 이용기간을
                  이용자에게 알리고 동의를 받으며 이용자는 언제든지 이 동의를
                  철회할 수 있습니다. 단, 정보통신망 이용촉진 및 정보보호 등에
                  관한 법률 제22조 제2항에 따라 정보통신서비스의 제공에 관한
                  계약을 이행하기 위하여 필요한 개인정보로서 경제적 기술적
                  사유로 통상적인 동의를 받는 것이 뚜렷하게 곤란한
                  경우(접속로그, 통화사실기록, 이용정지기록 등)는 예외로 합니다.
                  <br />
                  <br />
                      ⑥ 이용자는 언제든지 &ldquo;몰&rdquo;이 가지고 있는 자신의
                  개인정보에 대해 열람 및 오류정정을 요구할 수 있으며
                  &ldquo;몰&rdquo;은 이에 대해 지체 없이 필요한 조치를 취할
                  의무를 집니다. 이용자가 오류의 정정을 요구한 경우에는
                  &ldquo;몰&rdquo;은 그 오류를 정정할 때까지 당해 개인정보를
                  이용하지 않습니다.
                  <br />
                  <br />
                      ⑦ &ldquo;몰&rdquo;은 개인정보 보호를 위하여 이용자의
                  개인정보를 처리하는 자를 최소한으로 제한하며 신용카드,
                  은행계좌 등을 포함한 이용자의 개인정보의 분실, 도난, 유출,
                  동의 없는 제3자 제공, 변조 등으로 인한 이용자의 손해에 대하여
                  모든 책임을 집니다.
                  <br />
                  <br />
                      ⑧ &ldquo;몰&rdquo; 또는 그로부터 개인정보를 제공받은
                  제3자는 개인정보의 수집목적 또는 제공받은 목적을 달성한 때에는
                  당해 개인정보를 지체 없이 파기합니다.
                  <br />
                  <br />
                  <strong>제20조 &ldquo;몰&ldquo;의 의무</strong>
                  <br />
                  <br />
                      ① &ldquo;몰&rdquo;은 법령과 이 약관이 금지하거나
                  공서양속에 반하는 행위를 하지 않으며 이 약관이 정하는 바에
                  따라 지속적이고, 안정적으로 재화 등을 제공하는데 최선을
                  다하여야 합니다.
                  <br />
                  <br />
                      ② &ldquo;몰&rdquo;은 이용자가 안전하게 인터넷 서비스를
                  이용할 수 있도록 이용자의 개인정보(신용정보 포함)보호를 위한
                  보안 시스템을 갖추어야 합니다.
                  <br />
                  <br />
                      ③ &ldquo;몰&rdquo;이 상품이나 용역에 대하여
                  표시,광고의공정화에관한법률 제3조 소정의 부당한 표시,
                  광고행위를 함으로써 이용자가 손해를 입은 때에는 이를 배상할
                  책임을 집니다.
                  <br />
                  <br />
                      ④ &ldquo;몰&rdquo;은 이용자가 원하지 않는 영리목적의
                  광고성 전자우편을 발송하지 않습니다.
                  <br />
                  <br />
                  <strong>제21조 회원의 ID 및 비밀번호에 대한 의무</strong>
                  <br />
                  <br />
                      ① 제19조의 경우를 제외한 ID와 비밀번호에 관한 관리책임은
                  회원에게 있습니다.
                  <br />
                  <br />
                      ② 회원은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는
                  안됩니다.
                  <br />
                  <br />
                      ③ 회원이 자신의 ID 및 비밀번호를 도난 당하거나 제3자가
                  사용하고 있음을 인지한 경우에는 바로 &ldquo;몰&rdquo;에
                  통보하고 &ldquo;몰&rdquo;의 안내가 있는 경우에는 그에 따라야
                  합니다.
                  <br />
                  <br />
                  <strong>제22조 이용자의 의무</strong>
                  <br />
                  <br />
                      ① 이용자는 재화 등을 구매하기 전에 반드시
                  &ldquo;몰&rdquo;에 게시되어 있는 재화 등의 상세 정보와 거래
                  조건을 정확하게 확인한 후 구매를 하여야 합니다. 구매하려는
                  재화 등의 내용과 거래의 조건 등을 확인하지 않고 구매하여
                  발생한 모든 손실은 이용자에게 귀속됩니다.
                  <br />
                  <br />
                      ② 이용자는 다음 행위를 하여서는 안됩니다.
                  <br />
                  <br />
                      1. 신청 또는 변경시 허위 내용의 등록
                  <br />
                  <br />
                      2. 타인의 정보 도용
                  <br />
                  <br />
                      3. &ldquo;몰&rdquo;에 게시된 정보의 변경
                  <br />
                  <br />
                      4. &ldquo;몰&rdquo;이 정한 정보 이외의 정보(컴퓨터
                  프로그램 등) 등의 송신 또는 게시
                  <br />
                  <br />
                      5. &ldquo;몰&rdquo; 및 기타 제3자의 저작권 등 지적재산권에
                  대한 침해
                  <br />
                  <br />
                      6. &ldquo;몰&rdquo; 및 기타 제3자의 명예를 손상시키거나
                  업무를 방해하는 행위
                  <br />
                  <br />
                      7. 외설 또는 폭력적인 메시지,화상,음성,기타 공서양속에
                  반하는 정보를 &ldquo;몰&rdquo;에 공개 또는 게시하는 행위
                  <br />
                  <br />
                      8. 재판매 등의 목적으로 대량으로 재화를 구매하여 건전한
                  상거래 질서를 해하는 행위
                  <br />
                  <br />
                      9. 컴퓨터 등 정보처리장치에 허위의 정보 또는 부정한 명령을
                  입력하거나 권한 없이 정보를 입력 변경하여 정보처리를 하는 행위
                  (해킹 등)
                  <br />
                  <br />
                      10. &ldquo;몰&rdquo;을 이용하여 구입한 재화 등의 대금,
                  기타 &ldquo;몰&rdquo; 이용에 관련하여 회원이 부담하는 채무를
                  기일에 지급하지 않는 경우
                  <br />
                  <br />
                      11. 제3자의 &ldquo;몰&rdquo; 이용을 방해하거나 그 정보를
                  도용하는 등 전자상거래 질서를 위협하는 경우
                  <br />
                  <br />
                      12. 서비스의 이용과정에서 회사의 직원에게 폭언, 협박 또는
                  음란한 언행 등 부적절한 방법으로 회사의 업무를 방해하는 경우
                  <br />
                  <br />
                      13. 재화 등을 구매한 후 정당한 이유 없이 상습적으로 취소,
                  교환 및 반품하여 회사의 업무를 방해하는 경우
                  <br />
                  <br />
                  <strong>제22조의 2 상품평의 작성</strong>
                  <br />
                  <br />
                      상품평은 상품을 구매한 구매자가 작성할 수 있으며 공개를
                  원칙으로 합니다. 상품평 작성자는 자신이 작성한 상품평을 삭제할
                  수 있으나, 다수 구매자 편의를 위해 공개된 상품평의 삭제는
                  제한될 수 있습니다. 상품평(사진 이미지 포함)의 내용이
                  욕설,비방,음란,명예훼손 등 법령위반 내지 타인의 권리를
                  침해하거나 구매상품과 무관한 내용을 담고 있어 공개가 부적절한
                  경우 회사가 해당 상품평을 삭제할 수 있습니다. 회사는 상품평이
                  구매상품에 대한 불만이거나 판매자에게 불리한 내용이라는
                  이유만으로는 삭제하지 않습니다.
                  <br />
                  <br />
                  <strong>
                    제23조 연결&ldquo;몰&rdquo;과 피연결&ldquo;몰&rdquo; 간의
                    관계
                  </strong>
                  <br />
                  <br />
                      ① 상위 &quot;몰&quot;과 하위 &quot;몰&quot;이 하이퍼
                  링크(예:하이퍼 링크의 대상에는 문자, 그림 및 동화상 등이
                  포함됨) 방식 등으로 연결된 경우, 전자를 연결
                  &quot;몰&quot;(웹사이트)이라고 하고 후자를 피연결
                  &quot;몰&quot;(웹사이트)이라고 합니다.
                  <br />
                  <br />
                      ② 연결 &quot;몰&quot;은 피연결 &quot;몰&quot;이 독자적으로
                  제공하는 재화등에 의하여 이용자와 행하는 거래에 대해서
                  보증책임을 지지 않는다는 뜻을 연결 &quot;몰&quot;의 초기화면
                  또는 연결되는 시점의 팝업화면으로 명시한 경우에는 그 거래에
                  대한 보증책임을 지지 않습니다.
                  <br />
                  <br />
                  <strong>제24조 저작권의 귀속 및 이용제한</strong>
                  <br />
                  <br />
                      ① &ldquo;몰&ldquo;이 작성한 저작물에 대한 저작권 기타
                  지적재산권은 &rdquo;몰&ldquo;에 귀속합니다.
                  <br />
                  <br />
                      ②이용자는 &ldquo;몰&rdquo;을 이용함으로써 얻은 정보 중
                  &ldquo;몰&rdquo;에게 지적재산권이 귀속된 정보를
                  &ldquo;몰&rdquo;의 사전 승낙없이 복제, 송신, 출판, 배포, 방송
                  기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게
                  하여서는 안됩니다.
                  <br />
                  <br />
                      ③ &ldquo;몰&rdquo;은 약정에 따라 이용자에게 귀속된
                  저작권을 사용하는 경우 당해 이용자에게 통보하여야 합니다.
                  <br />
                  <br />
                  <strong>제25조 분쟁해결</strong>
                  <br />
                  <br />
                      ① &ldquo;몰&rdquo;은 이용자가 제기하는 정당한 의견이나
                  불만을 반영하고 그 피해를 보상처리하기 위하여
                  피해보상처리기구를 설치, 운영합니다.
                  <br />
                  <br />
                      ② &ldquo;몰&rdquo;은 이용자로부터 제출되는 불만사항 및
                  의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가
                  곤란한 경우에는 이용자에게 그 사유와 처리일정을 즉시 통보해
                  드립니다.
                  <br />
                  <br />
                      ③ &ldquo;몰&rdquo;과 이용자간에 발생한 전자상거래 분쟁과
                  관련하여 이용자의 피해구제신청이 있는 경우에는 공정거래위원회
                  또는 시&bull;도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수
                  있습니다.
                  <br />
                  <br />
                  <strong>제26조 재판권 및 준거법</strong>
                  <br />
                  <br />
                      ① &ldquo;몰&rdquo;과 이용자간에 발생한 전자상거래 분쟁에
                  관한 소송은 제소 당시의 이용자의 주소에 의하고, 주소가 없는
                  경우에는 거소를 관할하는 지방법원의 전속관할로 합니다. 다만,
                  제소 당시 이용자의 주소 또는 거소가 분명하지 않거나 외국
                  거주자의 경우에는 민사소송법상의 관할법원에 제기합니다.
                  <br />
                  <br />
                      ② &ldquo;몰&rdquo;과 이용자간에 제기된 전자상거래 소송에는
                  대한민국법을 적용합니다.
                  <br />
                  <br />
                  <strong>부칙 (2022.10.04)</strong>
                  <br />
                  <br />    제1조(시행일) 이 약관은 2022년 10월 4일부터
                  시행하며, 종전의 약관은 이 약관으로 대체합니다.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                aria-controls="panel2d-content"
                id="panel2d-header"
              >
                <Typography>멤버십 이용약관 동의</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{
                    height: 300,
                    display: "inline-block",
                    overflow: "auto",
                  }}
                  className="agreeterm"
                  paragraph
                >
                  회사는 회원가입, 민원 등 고객상담 처리, 본인확인(14세 미만
                  아동 확인)의 의사소통을 위한 정보 활용 및 이벤트와 같은
                  마케팅용도 활용, 회원의 서비스 이용에 대한 통계, 이용자들의
                  개인정보를 통한 서비스 개발을 위해 아래와 같은 개인정보를
                  수집하고 있습니다.
                  <br />
                  <br />
                  *선택수집항목은 필수사항이 아니며, 입력하지 않더라도 정상적인
                  서비스 이용이 가능합니다.
                  <br />
                  <br />
                  1. - 목적 : 이용자 식별 및 본인여부 확인
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;- 필수수집항목 : 아이디, 비밀번호,
                  이름, 이메일, 휴대폰번호, 성별, 생년월일
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;- 선택수집항목 : 전화번호, 주소,
                  추천인아이디
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp; * 네이버 간편가입 시<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;- 필수수집항목 : 이용자 식별자
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;- 선택수집항목 : 이름, 이메일 주소,
                  별명, 성별, 생일, 연령대
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <br />* 카카오 간편가입 시 
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp; - 필수수집항목 : 회원 식별을 위한
                  회원 번호
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp; - 보유 및 이용기간 : 회원탈퇴 후
                  5일까지
                  <br />
                  <br />
                  2. - 목적 : 민원 등 고객 고충처리
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;- 항목 : 이름, 아이디, 이메일,
                  휴대폰번호, 전화번호, 주소, 구매자정보,결제정보,상품
                  구매/취소/교환/반품/환불 정보, 수령인정보
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp; - 보유 및 이용기간 : 회원탈퇴 후
                  5일까지
                  <br />
                  <br />
                  3. - 목적 : 만 14세 미만 아동 확인
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;- 항목 : 법정 생년월일
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;- 보유 및 이용기간 :{" "}
                  <strong>회원탈퇴 후 5일까지</strong>                         
                      이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용
                  목적 달성 시 지체없이 파기합니다. 다만 다른 법령에서 별도의
                  기간을 정하고 있는 경우나 이용자의 요청에 따라 기간을 달리
                  정한 경우에는 그 기간이 경과한 후 파기 등의 필요한 조치를 취합
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>

          <FormControlLabel
            sx={{ alignItems: "left", ml: -15.5, mt: 2, fontStyle: "italic" }}
            required
            control={
              <Checkbox
                name="infoCheck"
                id="infoCheck"
                sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
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
        <Typography variant="h5" sx={{ mt: 6, fontSize: 16, color: "gray" }}>
          Copyright © CLOJET 2023
        </Typography>
      </Container>
    </>
  );
}

export default Signup;
