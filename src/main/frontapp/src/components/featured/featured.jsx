import './featured.scss';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Featured = () => {
    return (
        <div className='featured'>
            <div className='top'>
                <div className='title'>
                    <h1>목표 금액</h1>
                    <MoreVertRoundedIcon fontSize='small' />
                </div>
            </div>
            <div className='bottom'>
                <div className='featuredChart'>
                    <CircularProgressbar value={70} text={'70%'} strokeWidth={4} />
                </div>
                <p className='title'>총 매출 금액</p>
                <p className='amount'>420 KRW</p>
            </div>
        </div>
    );
};

export default Featured;
