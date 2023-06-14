import React, { useState } from 'react';
import '../styles/detail.scss';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import CreditCardOffOutlinedIcon from '@mui/icons-material/CreditCardOffOutlined';
import PermPhoneMsgOutlinedIcon from '@mui/icons-material/PermPhoneMsgOutlined';
import LooksOneRoundedIcon from '@mui/icons-material/LooksOneRounded';
import LooksTwoRoundedIcon from '@mui/icons-material/LooksTwoRounded';

function Detail() {
    // DB
    const size = [80, 110];
    const color = ['red', 'blue'];

    const [sizeState, setSizeState] = useState(Array(size.length).fill(false));
    const [colorState, setColorState] = useState(Array(size.length).fill(false));
    const [divCount, setDivCount] = useState(0);

    function hasTrueValue() {
        if (!sizeState.some((value) => value === true) || !colorState.some((value) => value === true)) {
            alert('옵션을 선택해주세요');
        } else {
            alert('구매페이지로 이동하기');
        }
    }

    function renderDivs() {
        const divs = [];
        for (let i = 0; i < divCount; i++) {
            divs.push(<div key={i}>Div {i + 1}</div>);
        }
        return divs;
    }

    function clickE(setState, index) {
        setState((prev) => {
            const newState = [...prev];

            if (!newState[index]) {
                newState.fill(false);
                newState[index] = true;
            } else {
                newState[index] = false;
            }

            return newState;
        });
    }

    function OtherInformation(icon, title, subtitle) {
        return (
            <div>
                <div className='icon'>{icon}</div>
                <div className='title'>
                    <p>{title}</p>
                    <span>{subtitle}</span>
                </div>
                <div className='icon'>
                    <OpenInNewRoundedIcon />
                </div>
            </div>
        );
    }

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
                    <div className='title_box'>
                        <h1 className='title'>titletitletitletitletitl etitletitletitletitle</h1>
                        <h2 className='subtitle'>titletitletitletitletitl etitletitletitletitle</h2>
                    </div>

                    <div className='pirce_box'>
                        <span className='discount text-red'>50%</span>
                        <del>3000,000원</del>
                        <p>2,000,000원</p>
                    </div>

                    <div className='size'>
                        <span>
                            <LooksOneRoundedIcon />
                            SIZE
                        </span>
                        <div className='select'>
                            {size.map((value, index) => {
                                return (
                                    <div
                                        className={sizeState[index] && 'check'}
                                        key={index}
                                        onClick={() => clickE(setSizeState, index)}
                                    >
                                        {value}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className={`color ${sizeState.some((value) => value === true) ? null : 'hidden'}`}>
                        <span>
                            <LooksTwoRoundedIcon />
                            color
                        </span>
                        <div className='select'>
                            {color.map((value, index) => {
                                return (
                                    <div
                                        className={colorState[index] && 'check'}
                                        key={index}
                                        onClick={() => {
                                            clickE(setColorState, index);
                                        }}
                                    >
                                        {value}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        {renderDivs()}
                        <h1>tititititititititit</h1>
                        <h1>300000000000원</h1>
                    </div>

                    <div className='buy_box'>
                        <div>장바구니</div>
                        <div onClick={() => hasTrueValue()}>구매하기</div>
                    </div>

                    <div className='otherInformation'>
                        {OtherInformation(<LocalShippingOutlinedIcon />, '설명문', '설명문')}
                        {OtherInformation(<ReceiptLongRoundedIcon />, '설명문')}
                        {OtherInformation(<CreditCardOffOutlinedIcon />, '설명문')}
                        {OtherInformation(<PermPhoneMsgOutlinedIcon />, '설명문')}
                    </div>
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
