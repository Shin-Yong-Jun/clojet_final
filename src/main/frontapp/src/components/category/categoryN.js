import React from 'react';
import cNdata from './cNdata';
import './categoryN.scss';
import { Link } from 'react-router-dom';
import { Check, CheckBox } from '@mui/icons-material';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';

function CategoryN() {
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
                    <div className='side_item2'>
                        <div className='side_title'>
                            <h2>성별</h2>
                            <ArrowDropDownRoundedIcon />
                        </div>
                        <div>
                            <input type='checkbox' />
                            <span>man</span>
                        </div>
                        <div>
                            <input type='checkbox' />
                            <span>woman</span>
                        </div>
                    </div>
                    <div className='side_item3'>
                        <h2>색상</h2>
                        <div>
                            <div>
                                <div>동그라미</div>
                                <div>색상1</div>
                            </div>
                            <div>
                                <div>동그라미</div>
                                <div>색상2</div>
                            </div>
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
            </div>
        </div>

        /* <h1>NEW</h1>
            <div className='container'>
                {cNdata.map((product,index) => (
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
            </div> */
    );
}

export default CategoryN;
