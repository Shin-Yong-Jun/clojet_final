import React, { useState } from 'react';
import cNdata from './cNdata';
import './categoryN.scss';
import { Link } from 'react-router-dom';
import { Check, CheckBox } from '@mui/icons-material';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

function CategoryN() {
    const size = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
    const [first, setfirst] = useState(Array(size.length).fill(false));

    function clickE(index) {
        console.log(first);
        setfirst((prevS) => {
            const new1 = [...prevS];
            new1[index] = !new1[index];
            return new1;
        });
        console.log(first);
    }

    return (
        <div className='category'>
            <div className='category_left'>
                <div className='category_side'>
                    <h1>NEW</h1>
                    <div className='side_item'>
                        <Link to={'/'}>아우터</Link>
                        <Link to={'/'}>top</Link>
                        <Link to={'/'}>아우터</Link>
                        <Link to={'/'}>아우터</Link>
                        <Link to={'/'}>아우터</Link>
                        <Link to={'/'}>아우터</Link>
                        <Link to={'/'}>아우터</Link>
                    </div>
                    <div className='side_item'>
                        <div className='side_title'>
                            <h3>성별</h3>
                            <ArrowDropDownRoundedIcon className='icon' />
                        </div>
                        <div>
                            <input type='checkbox' />
                            <span> man</span>
                        </div>
                        <div>
                            <input type='checkbox' />
                            <span> woman</span>
                        </div>
                    </div>
                    <div className='side_item'>
                        <div className='side_title'>
                            <h3>가격대</h3>
                            <ArrowDropDownRoundedIcon className='icon' />
                        </div>
                        <div>
                            <input type='checkbox' />
                            <span> 0 - 100,000 원</span>
                        </div>
                        <div>
                            <input type='checkbox' />
                            <span> 100,000 - 200,000 원</span>
                        </div>
                        <div>
                            <input type='checkbox' />
                            <span> 200,000 - 300,000 원</span>
                        </div>
                        <div>
                            <input type='checkbox' />
                            <span> 300,000 - 400,000 원</span>
                        </div>
                        <div>
                            <input type='checkbox' />
                            <span> 400,000 - 500,000 원</span>
                        </div>
                    </div>
                    <div className='side_item'>
                        <div className='side_title'>
                            <h3>색상</h3>
                            <ArrowDropDownRoundedIcon className='icon' />
                        </div>
                        <div className='pallet'>
                            <div className='color_box'>
                                <div className='color'>{'동그라미'}</div>
                                <div className='color_name'>{'색상'}</div>
                            </div>
                        </div>
                    </div>
                    <div className='side_item'>
                        <div className='side_title'>
                            <h3>사이즈</h3>
                            <ArrowDropDownRoundedIcon className='icon' />
                        </div>
                        <div className='size_list'>
                            {size.map((sizeV, index) => {
                                return (
                                    <div
                                        key={sizeV}
                                        onClick={() => clickE(index)}
                                        className={`size ${first && 'active'}`}
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
                </div>
                {/* <div className='container'>
                    {cNdata.map((product, index) => (
                        <div key={product.id} className='pd_box'>
                            <div className='pd_img'>
                                <a href='/'>
                                    <img
                                        src={require(`../../image/product${
                                            index + 1
                                        }.jpg`)}
                                        alt={`product${index + 1}`}
                                    />
                                </a>
                            </div>
                            <div className='pd_info'>
                                <p>{product.title}</p>
                                <p>{product.PercentS}</p>
                                <p>
                                    <del>{product.basicP}</del>{' '}
                                    <strong>{product.saleP}</strong>
                                </p>
                            </div>
                        </div>
                    ))}
                </div> */}
            </div>
        </div>
    );
}

export default CategoryN;
