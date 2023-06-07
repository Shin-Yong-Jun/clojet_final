import './single.scss';

import Chart from '../../../components/chart/chart';
import TableList from '../../../components/table/table';

const Single = () => {
    return (
        <div className='single'>
            <div className='top'>
                <div className='left'>
                    <div className='editBtn'>수정</div>
                    <h1 className='title'>information</h1>
                    <div className='item'>
                        <img src={require('../../../image/kawaee.png')} alt='' className='itmeImg' />
                        <div className='details'>
                            <h1 className='itemTitle'>강 인구</h1>
                            <div className='detailItem'>
                                <span className='itemKey'>이메일 : </span>
                                <span className='itemValue'>necron7577@daum.net </span>
                            </div>
                            <div className='detailItem'>
                                <span className='itemKey'>주소 : </span>
                                <span className='itemValue'>신봉2로 72</span>
                            </div>
                            <div className='detailItem'>
                                <span className='itemKey'>전화번호 : </span>
                                <span className='itemValue'>010-7577-8029 </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='right'>
                    <Chart aspect={6 / 1} title='최근 6개월 구매 추이' />
                </div>
            </div>
            <div className='bottom'>
                <TableList />
            </div>
        </div>
    );
};

export default Single;
