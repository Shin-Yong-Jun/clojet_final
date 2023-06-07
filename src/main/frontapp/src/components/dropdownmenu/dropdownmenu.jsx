import './dropdownmenu.scss';
import AccessibilityRoundedIcon from '@mui/icons-material/AccessibilityRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';

const DropDownItem = (props) => {
    return (
        <li className='dropDownItem'>
            {props.img}
            <a href='/'>{props.text}</a>
            {/* router로 변경예정 */}
        </li>
    );
};

const DropDownMenu = ({ dropDownopen, target }) => {
    return (
        <div className={`dropDownMenu ${dropDownopen ? 'active' : 'inactive'} ${target}`}>
            <h1>"아이디"</h1>
            <h2>"권한" or "직책"</h2>
            <ul>
                <DropDownItem img={<AdminPanelSettingsRoundedIcon />} text={'내 정보'} />
                <DropDownItem img={<AccessibilityRoundedIcon />} text={'내 정보'} />
            </ul>
        </div>
    );
};

export default DropDownMenu;
