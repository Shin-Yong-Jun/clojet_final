import { Box, Avatar, Checkbox, TextField, Button, FormControlLabel, Grid, 
  Typography, createTheme, ThemeProvider, Container } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors'

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#000000',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

//=============================
const emailValidation = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

const pwValidation = (password) => {
  const pwRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return pwRegex.test(password);
  }


//=============================

function Login() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    if (email && password) {
      // 이메일 형식 검사
      if (!emailValidation(email)) {
        alert('올바른 이메일 형식이 아닙니다.'); // 경고 메시지 표시
        return; // 함수 종료
      } else {
        if(!pwValidation(password)) {
          alert('비밀번호는 최소 8자 이상이어야 하며, 영문 대소문자, 숫자, 특수문자(@$!%*?&)를 모두 포함해야 합니다.')
          return;
        }
      }

      console.log({
        email: email,
        password: password,
      });
      navigate('/');
    } else {
      alert('이메일과 비밀번호를 모두 입력해주세요.'); // 경고 메시지 표시
    }
  }



  return (
    <Container component="main" maxWidth="xs" 
    sx={{
      height:'800px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      }}>
      <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 8,
          }}
        >
          <Avatar sx={{
            width: 56, height: 56, bgcolor:'black'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant='h5'
          sx={{fontSize:30, mt:1}}>
            LOGIN
          </Typography>
        </Box>
      
      <Box
      component="form"
      method='post'
      action={'/'}
      onSubmit={handleSubmit}
      noValidate
      sx={{
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
          <TextField 
          sx={{mt:3, width: 400}}
          label="이메일 주소 입력"
          name='email'
          id='email'
          type="email"
          autoComplete="email"
          autoFocus
          required
          fullWidth />

          <TextField 
          sx={{mt:2, width: 400}}
          label="비밀번호 입력" 
          name='password'
          id='password'
          type="password" 
          autoComplete="current-password"
          required
          fullWidth/>
      
          <FormControlLabel
            control={<Checkbox value="remember" sx={{color:grey,'&.Mui-checked': {color: grey[600],},}} />}
            label="계정 기억하기"
            sx={{ml:-32,mt:1}}
            
          />

          <ThemeProvider theme={theme}>
          <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{mt:1, width: 400}}
          color='primary' >로그인</Button>  
          </ThemeProvider>
          

          </Box>

          <Grid container
          sx={{mt:2, width: 400}}
          >
            <Grid item xs>
              <Link to={'/findpw'}><b>비밀번호 찾기</b></Link>
            </Grid>
            <Grid item>
              <Link to={'/signup'}><b>회원가입</b></Link>
            </Grid>
          </Grid>

      <Typography variant='h5'
          sx={{mt:6, fontSize:16, color:'gray'}}>
            Copyright © CLOJET 2023
          </Typography>

    </Container>
  )
}

export default Login