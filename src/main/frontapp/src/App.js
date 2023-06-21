import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import Main from './pages/main';
import Login from './pages/login';
import Signup from './pages/signup';
import Findpw from './pages/findpw';
import Cart from './pages/cart';
import Purchase from './pages/purchase';
import Mypage from './pages/mypage';
import Detail from './pages/detail';
import Category from './pages/category';
import Dashboard from './pages/admin/dashboard/dashboard';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
    // 테스트용코드 (더미데이터 ON!)
    // const [checkLogin, setCheckLogin] = useState({
    //     userIdx: '2',
    //     userName: 'test',
    //     userGender: 'f',
    //     userEmail: 'hakro1@gmail.com',
    //     userPhone: '01089456515',
    // });

    // 테스트용코드 (더미데이터 OFF!)
    const [checkLogin, setCheckLogin] = useState(false);

    useEffect(() => {
        // 페이지 로드 시 sessionStorage에서 checkLogin 값 가져오기
        const storedCheckLogin = sessionStorage.getItem('checkLogin');
        if (storedCheckLogin !== null) {
            setCheckLogin(JSON.parse(storedCheckLogin));
        }
    }, []);

    useEffect(() => {
        // checkLogin 값이 변경될 때마다 sessionStorage에 저장
        sessionStorage.setItem('checkLogin', JSON.stringify(checkLogin));
    }, [checkLogin]);

    return (
        <Routes>
            <Route
                path='/*'
                element={
                    <>
                        <Header
                            checkLogin={checkLogin}
                            setCheckLogin={setCheckLogin}
                        />
                        <main>
                            <Routes>
                                <Route index element={<Main />} />
                                <Route
                                    path='/category/*'
                                    element={<Category />}
                                />
                                <Route
                                    path='/login'
                                    element={
                                        <Login setCheckLogin={setCheckLogin} />
                                    }
                                />
                                <Route path='/signup' element={<Signup />} />
                                <Route path='/findpw' element={<Findpw />} />
                                <Route path='/cart' element={<Cart />} />
                                <Route
                                    path='/purchase'
                                    element={<Purchase />}
                                />
                                <Route
                                    path='/mypage/*'
                                    element={
                                        <Mypage
                                            checkLogin={checkLogin}
                                            setCheckLogin={setCheckLogin}
                                        />
                                    }
                                />
                                <Route path='/detail' element={<Detail />} />
                                <Route path='/*' errorElement={<ErrorPage />} />
                            </Routes>
                        </main>
                        <Footer />
                    </>
                }
            />
            <Route path='/admin' element={<Dashboard />} />
        </Routes>
    );
}
export default App;


function ErrorPage() {
    return (
        <>
            <div>
                잘못된 페이지 요청 입니다.
            </div>
        </>
    )
}