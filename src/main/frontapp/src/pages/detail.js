import React, { useEffect, useRef, useState } from 'react';
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

    const detail_bottom_header = useRef(null);

    useEffect(() => {
        window.addEventListener('wheel', handleWheel);
        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, []);

    const handleWheel = (e) => {
        if (e.target.closest('.agreeterm')) return;
        let wheel = e.deltaY;
        if (wheel > 0) {
            detail_bottom_header.current.style.top = '55px';
        } else {
            detail_bottom_header.current.style.top = '85px';
        }
    };

    function scrollToElement(getId) {
        const element = document.getElementById(getId);
        window.scrollTo({ top: element.offsetTop + -50, behavior: 'smooth' });
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

                    <div className='color'>
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
                <div className='detail_bottom_header' ref={detail_bottom_header}>
                    <ul>
                        <li className='check' onClick={() => scrollToElement('detail_bottom_information')}>
                            상품정보
                        </li>
                        <li onClick={() => scrollToElement('detail_bottom_review')}> 상품후기</li>
                        <li onClick={() => scrollToElement('detail_bottom_Inquiry')}>상품문의</li>
                        <li onClick={() => scrollToElement('detail_bottom_etc_info')}>배송/반품/교환</li>
                    </ul>
                </div>
                <div className='detail_bottom_information' id='detail_bottom_information'>
                    <img src={require('../image/detailImages/product_0/detail.jpg')} alt='' />
                </div>

                <div className='detail_bottom_review' id='detail_bottom_review'>
                    detail_bottom_review
                </div>

                <div className='detail_bottom_Inquiry' id='detail_bottom_Inquiry'>
                    detail_bottom_Inquiry
                </div>

                <div className='detail_bottom_etc_info' id='detail_bottom_etc_info'>
                    <div className='title'>배송/교환/반품</div>
                    <table>
                        <tr key='1'>
                            <th>배송안내</th>
                            <td>
                                <p>배송비</p>
                                <p>평균배송일</p>
                                <p>배송지역</p>
                            </td>
                            <td>
                                <p>
                                    모든 상품의 배송비는 주문금액 19,800원 이상시 (제주도 및 기타 도서산간 추가지역
                                    제외) 무료입니다. (일부상품 제외)
                                </p>
                                <p>
                                    평균 2일 (주말 및 공휴일 제외) 주말 출고량이 많을 경우 1~2일 정도 지연될 수
                                    있습니다.
                                </p>
                                <p>
                                    국내 전국 가능 (일부 도서산간 지역의 경우 지역 특성에 따라 배송이 불가 할 수
                                    있습니다.)
                                </p>
                            </td>
                        </tr>
                        <tr key='2'>
                            <th>교환/반품</th>
                            <td></td>
                            <td>
                                <p>
                                    고객센터로 요청하시면 교환 및 환불이 가능합니다. 반송처 및 회수지 : 경기도 광주시
                                    초월읍 산수로226번길 32 제이엠공감로직스
                                </p>
                            </td>
                        </tr>
                        <tr key='3'>
                            <th rowSpan={2}>교환/반품/환불 시 주의사항</th>
                            <td>교환/반품/환불이 가능한 경우</td>
                            <td>
                                <p>
                                    구입한 상품에 이상이 있는 경우나 마음에 들지 않아 교환하시는 경우 모두 교환 및
                                    환불이 가능합니다. 교환이나 환불을 원하실 경우 고객님이 제품을 받으신 날부터 7일
                                    이내에 반품/교환/환불을 신청을 하셔야 합니다. (단, 상품 불량인 경우 30일 이내에 반품
                                    신청을 하실 수 있습니다.) 모니터 사양에 따른 색상 차이로 교환 및 환불을 원하실 경우
                                    택배비는 소비자 부담입니다. 교환/환불 신청 후 14일 이내 상품이 반품지로 도착하지
                                    않을 경우 교환 접수는 임의적으로 취소됩니다. (단 , 회수 반품 배송 지연의 경우는
                                    제외) (교환 차액, 택배비 관련 주문자와 입금명이 동일하지 않아 입금확인 아되지 않은
                                    경우 또한 취소 처리)
                                </p>
                            </td>
                        </tr>
                        <tr key='4'>
                            <td>교환/반품/환불이 불가능한 경우</td>
                            <td>
                                <p>
                                    제품 개봉 및 장착하신 제품은 반품 및 환불이 불가능합니다. (단, 불량제품 제외)
                                    고객님께서 마음이 들지 않는 상품이지만 상품에 하자가 없는 새상품이므로 재판매하여야
                                    하는 상품입니다. 그러므로 판매에 이상이 있는 경우에는 반품 받으실 수 없습니다.
                                    제품에 붙어있는 탭을 훼손/분실하거나 상품박스에 낙서나 테이핑을 한 경우에도
                                    교환/환불이 불가합니다. 고객님 임의대로 반품하셔서 상품훼손이 있는 경우 반품이
                                    불가할 수 있습니다. 반품을 원하실 경우 배송전에 반드시 고객센터로 전화를 주시기
                                    바랍니다. 함께 제공된 사은품을 사용하셨거나 반품시 누락된 경우는 반품이
                                    불가능합니다.
                                </p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Detail;
