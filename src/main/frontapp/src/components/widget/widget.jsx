import './widget.scss';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';

const Widget = ({ type }) => {
    let data;

    const amount = 100;
    const diff = 20;

    switch (type) {
        case 'user':
            data = {
                title: '회원 수',
                isMoney: false,
                link: '회원 페이지 바로가기',
                icon: <PeopleRoundedIcon className='icon' />,
            };
            break;
        case 'order':
            data = {
                title: '주문 수',
                isMoney: false,
                link: '주문 페이지 보러가기',
                icon: <ShoppingCartRoundedIcon className='icon' />,
            };
            break;
        case 'earning':
            data = {
                title: '매출 액',
                isMoney: true,
                link: '매출 자료 보러가기',
                icon: <MonetizationOnRoundedIcon className='icon' />,
            };
            break;
        default:
            break;
    }
    return (
        <div className='widget'>
            <div className='left'>
                <span className='title'>{data.title}</span>
                <span className='counter'>
                    {amount}
                    {data.isMoney && ' KRW'}
                </span>
                <span className='link'>{data.link}</span>
            </div>
            <div className='right'>
                <div className='percentage positive'>
                    <KeyboardArrowUpRoundedIcon />
                    {diff} %
                </div>
                {data.icon}
            </div>
        </div>
    );
};

export default Widget;
