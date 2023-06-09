import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import Main from "./pages/main";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Findpw from "./pages/findpw";
import Cart from "./pages/cart";
import Purchase from "./pages/purchase";
import Mypage from "./pages/mypage";
import Detail from "./pages/detail";
import Category from "./pages/category";
import Dashboard from "./pages/admin/dashboard/dashboard";
import AxiosTest from "./pages/axtest";
import { Route, Routes } from "react-router-dom";
import { useState } from 'react';

function App() {
  const [checkLogin, setCheckLogin] = useState(
    {
      userName: "이학로",
      address: "hakro125@gmail.com",
      phoneNumber: "010-8828-4608"
    }
  );


  return (
    <>
      <Header checkLogin={checkLogin} setCheckLogin={setCheckLogin} />

      <main>
        <Routes>
          <Route index element={<Main />} />
          <Route path="/category/*" element={<Category />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/findpw" element={<Findpw />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/mypage/*" element={<Mypage checkLogin={checkLogin}/>} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/admin/*" element={<Dashboard />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
