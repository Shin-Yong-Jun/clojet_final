import './dashboard.scss';
import { Route, Routes } from 'react-router-dom';

import Navbar from '../../../components/navbar/navbar';
import Sidebar from '../../../components/sidebar/sidebar';
import Widget from '../../../components/widget/widget';
import Featured from '../../../components/featured/featured';
import Chart from '../../../components/chart/chart';
import TableList from '../../../components/table/table';
import Prepar from '../../../components/prepar/prepar';
import User from '../user/user';
import Single from '../single/single';
import Product from '../product/product';

function DashBoardMain() {
    return (
        <>
            <div className='widgets'>
                <Widget type='user' />
                <Widget type='order' />
                <Widget type='earning' />
            </div>
            <div className='charts'>
                <Featured />
                <Chart aspect={4 / 1} title={'최근 6개월 매출'} />
            </div>
            <TableList />
        </>
    );
    //12312312312312
}
function UserMain() {
    return (
        <Routes>
            <Route index element={<User />} />
            <Route path='/*' element={<Single />} />
        </Routes>
    );
}
function ProductMain() {
    return (
        <Routes>
            <Route index element={<Product />} />
            <Route path='/*' element={<Single />} />
        </Routes>
    );
}

const DashBoard = () => {
    return (
        <div className='dashBoard'>
            <Sidebar />
            <div className='dashBoardContainer'>
                <Navbar />
                <Routes>
                    <Route index element={<DashBoardMain />} />
                    <Route path='/user/*' element={<UserMain />} />
                    <Route path='/product/*' element={<ProductMain />} />
                    <Route path='/prepar' element={<Prepar />} />
                </Routes>
            </div>
        </div>
    );
};

export default DashBoard;
