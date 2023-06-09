import React from 'react';
import '../styles/detail.scss';

import GradeRoundedIcon from '@mui/icons-material/GradeRounded';

function Detail() {
    // DB
    const original_price = 600000;
    const discount = 50;
    const rating = 4.2;

    return (
        <div className='detail'>
            <div className='detail_top'>
                <div className='detail_top_thumnail'>
                    <div className='detail_top_main_thumnail'>
                        <img src={require('../image/detailImages/product_0/0.jpg')} alt='thum' />
                        {/* DB */}
                    </div>
                    <div className='detail_top_sub_thumnail'>
                        <img src={require('../image/detailImages/product_0/0.jpg')} alt='thum' />
                        <img src={require('../image/detailImages/product_0/0.jpg')} alt='thum' />
                        <img src={require('../image/detailImages/product_0/0.jpg')} alt='thum' />
                        <img src={require('../image/detailImages/product_0/0.jpg')} alt='thum' />
                        <img src={require('../image/detailImages/product_0/0.jpg')} alt='thum' />
                        {/* DB */}
                    </div>
                </div>

                <div className='detail_top_information'>
                    <div className='event_logo text-red'>
                        <span>event_logo</span>
                        <span>event_logo</span>
                    </div>

                    <div className='hashTag text-red'>
                        <span>#hashTag</span>
                        <span>#hashTag</span>
                        <span>#hashTag</span>
                    </div>

                    <h1 className='title'>titletitletitletitletititle titletitletitletletitletitle</h1>

                    <div className='price_area border-top'>
                        <strong className='discount text-red'>{'50%'}</strong>
                        <strong className='price'>
                            {(original_price * discount) / 100}
                            <span className='won'>원</span>
                        </strong>
                        <small className='text-gray'>
                            <del className='original_price'>{original_price}</del>
                            <span className='won'>원</span>
                        </small>
                    </div>

                    <div className='about_rating border-top'>
                        <div className='rating_star'>
                            <GradeRoundedIcon />
                            <GradeRoundedIcon />
                            <GradeRoundedIcon />
                            <GradeRoundedIcon />
                            <GradeRoundedIcon />
                        </div>
                        <span className='rating'>{rating}</span>
                    </div>

                    <div className='delivery_info border-top'>
                        <h4>배송정보</h4>
                        <dl>
                            <dt>배송유형</dt>
                            <dd>{'일반배송'}</dd>
                        </dl>
                        <dl>
                            <dt>배송비</dt>
                            <dd>{'3000'}</dd>
                            <span className='won'>원</span>
                        </dl>
                    </div>

                    <div className='payment_info border-top'>
                        <h4>가격정보</h4>
                        <dl>
                            <dt>판매가</dt>
                            <dd>{'600,000'}</dd>
                            <span className='won'>원</span>
                        </dl>
                        <dl>
                            <dt>포인트적립</dt>
                            <dd>{'600,000'}</dd>
                            <span className='won'>원</span>
                        </dl>
                    </div>

                    <div className='buy_info border-top'>buy_info</div>
                </div>
            </div>
            <div className='detail_bottom'>
                <div className='detail_bottom_header'>detail_bottom_header</div>
                <div className='detail_bottom_information'>detail_bottom_information</div>
                <div className='detail_bottom_review'>detail_bottom_review</div>
                <div className='detail_bottom_Inquiry'>detail_bottom_Inquiry</div>
                <div className='detail_bottom_etc_info'>detail_bottom_etc_info</div>
            </div>
        </div>
    );
}

export default Detail;
