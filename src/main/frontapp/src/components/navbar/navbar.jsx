import { useState, useEffect, useRef } from 'react';

import './navbar.scss';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import DropDownMenu from '../dropdownmenu/dropdownmenu';

const Navbar = () => {
    const [dropDown, setDropDown] = useState({ open: false, target: undefined });
    let menuRef = useRef(null);

    function handleClick(target) {
        setDropDown({
            ...dropDown,
            open: dropDown.open && dropDown.target !== target ? dropDown.open : !dropDown.open,
            target: target,
        });
    }

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setDropDown({ ...dropDown, open: false });
            }
        };
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    });

    return (
        <div className='navbar'>
            <div className='wrapper'>
                <div className='searchInput'>
                    <input type='text' placeholder='검색...' />
                    <SearchRoundedIcon />
                </div>
                <div className='items' ref={menuRef}>
                    <div className='item' onClick={() => handleClick('notify')}>
                        <NotificationsNoneRoundedIcon className='icon' />
                        <div className='counter'>1</div>
                    </div>
                    <div className='item' onClick={() => handleClick('message')}>
                        <ChatBubbleOutlineRoundedIcon className='icon' />
                        <div className='counter'>1</div>
                    </div>
                    <div className='item' onClick={() => handleClick('personal')}>
                        <img src={require('../../image/kawaee.png')} alt='avatar' className='avatar' />
                    </div>
                    <DropDownMenu dropDownopen={dropDown.open} target={dropDown.target} />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
