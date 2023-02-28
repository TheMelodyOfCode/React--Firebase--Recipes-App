import * as React from 'react';
import { Link } from "react-router-dom";
import { GrUserSettings } from 'react-icons/gr';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { IoFastFoodOutline } from 'react-icons/io5';

const MainNav = ({user, logout}) => {

    return (
    <nav className='mainNav' >

            <div className="mainNav__logoBox">
                    <img className='mainNav__logoBox--logo'  src="img/recepie-logo.jpg" alt="logo"/>
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
                <li className="toggleMenu__item"><Link to='/' className="mainNav__toggleMenu__link">Home</Link></li>
                <li className="toggleMenu__item"><Link to='profile' className="mainNav__toggleMenu__link">Profile</Link></li>
                <li className="toggleMenu__item"><Link to='/contact' className="mainNav__toggleMenu__link">contact</Link></li>
                <li className="toggleMenu__item"><Link className="mainNav__toggleMenu__link" as='span' onClick={logout} >SIGN OUT</Link ></li>
            </ul>
        </nav>
    </div>

    </nav>
    )
}   

export default MainNav;