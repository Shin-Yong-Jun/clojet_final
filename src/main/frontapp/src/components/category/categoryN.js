import React, { useEffect, useState } from 'react';
import './categoryN.scss';
import { Link } from 'react-router-dom';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import Slider from '@mui/material/Slider';
import axios from 'axios';

const marks = [
    {
        value: 0,
        label: '0원',
    },

    {
        value: 10000000,
        label: '1000만원',
    },
];

function CategoryN() {
    const [size, setSize] = useState([]);
    const [item, setItem] = useState([]);
    const [color, setColor] = useState([]);
    const [product, setProduct] = useState([]);

    const [value, setValue] = useState([0, 1000000]);
    const [foldState, setFoldState] = useState(Array(4).fill(false));
    const [sizeState, setSizeState] = useState(Array(size.length).fill(false));
    const [colorState, setColorState] = useState(
        Array(color.length).fill(false),
    );

    useEffect(() => {
        axios
            .get('/category')
            .then((result) => {
                // console.log(result);
                setSize(result.data.csType);
                setItem(result.data.cmValMean);
                setColor(result.data.ccType);
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .get('/product/list')
            .then((result) => {
                console.log(result);
                setProduct(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function clickE(setState, index) {
        setState((prevS) => {
            const new1 = [...prevS];
            new1[index] = !new1[index];
            return new1;
        });
    }

    return (
        <div className='category'>
            <div className='category_left'>
                <div className='category_side'>
                    <h1>NEW</h1>
                    <div className='side_item'>
                        {item.map((itemV, index) => {
                            return (
                                <div className='item_type'>
                                    <Link to={'/'}>{itemV}</Link>
                                </div>
                            );
                        })}
                    </div>
                    <div className='side_item'>
                        <div className='side_title'>
                            <h3>성별</h3>
                            <div
                                onClick={() => {
                                    clickE(setFoldState, 0);
                                }}
                            >
                                <ArrowDropDownRoundedIcon className='icon' />
                            </div>
                        </div>
                        <div className={`contents ${foldState[0] && 'close'}`}>
                            <div>
                                <input type='checkbox' />
                                <span> man</span>
                            </div>
                            <div>
                                <input type='checkbox' />
                                <span> woman</span>
                            </div>
                            <div>
                                <input type='checkbox' />
                                <span> unisex</span>
                            </div>
                        </div>
                    </div>
                    <div className='side_item'>
                        <div className='side_title'>
                            <h3>가격대</h3>
                            <div
                                onClick={() => {
                                    clickE(setFoldState, 1);
                                }}
                            >
                                <ArrowDropDownRoundedIcon className='icon' />
                            </div>
                        </div>

                        <div className='close'>
                            <div className='price_box'>
                                <Slider
                                    className='price_slider'
                                    getAriaLabel={() => 'Temperature range'}
                                    valueLabelDisplay='auto'
                                    marks={marks}
                                    max={10000000}
                                    step={10000}
                                    value={value}
                                    onChange={handleChange}
                                />
                                <p className='priceC'>
                                    선택가격 : <span>{value[0]}</span> 원 ~{' '}
                                    <span>{value[1]}</span> 원
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='side_item'>
                        <div className='side_title'>
                            <h3>색상</h3>
                            <div
                                onClick={() => {
                                    clickE(setFoldState, 2);
                                }}
                            >
                                <ArrowDropDownRoundedIcon className='icon' />
                            </div>
                        </div>
                        <div className='pallet'>
                            {color.map((colorV, index) => {
                                return (
                                    <div className='color_box'>
                                        <div
                                            key={colorV}
                                            onClick={() =>
                                                clickE(setColorState, index)
                                            }
                                            className={`color ${colorV}
                                            ${colorState[index] && 'active'}`}
                                        ></div>
                                        <div className='color_name'>
                                            {colorV}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className='side_item'>
                        <div className='side_title'>
                            <h3>사이즈</h3>
                            <div
                                onClick={() => {
                                    clickE(setFoldState, 3);
                                }}
                            >
                                <ArrowDropDownRoundedIcon className='icon' />
                            </div>
                        </div>
                        <div className='size_list'>
                            {size.map((sizeV, index) => {
                                return (
                                    <div
                                        key={sizeV}
                                        onClick={() =>
                                            clickE(setSizeState, index)
                                        }
                                        className={`size ${
                                            sizeState[index] && 'active'
                                        }`}
                                    >
                                        <span>{sizeV}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className='category_right'>
                <div className='category_banner'>
                    <img
                        src={require('../../image/clojet-category-new-banner.png')}
                        alt={'categoryN_banner'}
                    />
                </div>
                <div className='category_item'>
                    <h1>아이템</h1>
                    <div className='containerC'>
                        {product.map((value, index) => (
                            <div key={value.productName} className='pd_box'>
                                <div className='pd_img'>
                                    <a href='/'>
                                        <img
                                            src={`/${value.productThumUrl}`}
                                            alt={value.productName}
                                        />
                                    </a>
                                </div>
                                <div className='pd_info'>
                                    <p>{value.productName}</p>
                                    <p>
                                        <del>{value.productPrice}</del>{' '}
                                        <strong>{value.productPrice}</strong>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryN;
