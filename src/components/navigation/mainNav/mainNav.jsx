import * as React from 'react';
import { Link } from "react-router-dom";
import { 
    FoodIcon, 
    SettingsIcon, 
    LogoutIcon, 
    ContactIcon } from '../../../utils/lib/lib';



const MainNav = ({user, logout}) => {


    return (
    <nav className='mainNav' >

    <div className="mainNav__logoBox">
        <h1 className='mainNav__logoBox--logo'>Recipies</h1>
    </div>

    <p className="mainNav__userEmail" >{user.email}</p>

    <div className="mainNav__toggleMenu">
        <input type="checkbox" className="mainNav__toggleMenu__checkbox" id="navi-toggle" />
        <label htmlFor="navi-toggle" className="mainNav__toggleMenu__button">
            <span className="mainNav__toggleMenu__icon">&nbsp;</span>
        </label>
        <div className="mainNav__toggleMenu__background">&nbsp;</div>
        <nav className="mainNav__toggleMenu__nav">
            <ul className="mainNav__toggleMenu__list">
                <li className="toggleMenu__item"><p className="mainNav__userEmail" >{user.email}</p></li>
                <br/>
                <li className="toggleMenu__item"><Link to='/' className="mainNav__toggleMenu__link"><FoodIcon />{' '} Home</Link></li>
                <li className="toggleMenu__item"><Link onClick={() => {window.location.href="/profile"}} className="mainNav__toggleMenu__link"><SettingsIcon/>{' '} Profile</Link></li>
                <li className="toggleMenu__item"><Link to='/contact' className="mainNav__toggleMenu__link"><ContactIcon/>{' '} Contact</Link></li>
                <li className="toggleMenu__item"><Link className="mainNav__toggleMenu__link"  onClick={logout} ><LogoutIcon/>{' '} SIGN OUT</Link ></li>
            </ul>
        </nav>
    </div>

    </nav>
    )
}   

export default MainNav;