import * as React from 'react';
import { Link } from "react-router-dom";

// import { useContext } from "react";

import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";



const Navigation = ()=> {
/* useContext tells this component to re-render as soon as a value inside itself changes */
    const {currentUser} = React.useContext(UserContext);

    return (
        <> 
        <div className="navigation">
        <input type="checkbox" className="navigation__checkbox" id="navi-toggle" />
        <label htmlFor="navi-toggle" className="navigation__button">
            <span className="navigation__icon">&nbsp;</span>
        </label>
        <div className="navigation__background">&nbsp;</div>
            <nav className="navigation__nav">
                <ul className="navigation__list">
                    <li className="navigation__item">
                    {
                    currentUser ? (
                        <Link className="navigation__link" as='span' onClick={() => {window.location.href="/auth";
                        signOutUser()}}>
                            SIGN OUT
                        </Link >
                        ) : ( 
                        <Link className="navigation__link" onClick={() => {window.location.href="/auth"}}>
                        SIGN IN
                        </Link>
                    )}        
                    </li>
                    <li className="navigation__item"><Link to='userDashboard' className="navigation__link"><span>02 </span>Dashboard</Link></li>
                    <li className="navigation__item"><Link to='userSettings' className="navigation__link"><span>03 </span>Edit Info</Link></li>
                    <li className="navigation__item"><Link to='profile' className="navigation__link"><span>04 </span>Profile</Link></li>
                    <li className="navigation__item"><Link to='#' className="navigation__link"><span>05 </span>Blog</Link></li>
                    <li className="navigation__item"><Link to='#' className="navigation__link"><span>06 </span>contact</Link></li>
                    <li className="navigation__item"><Link to='#' className="navigation__link"><span>07 </span>Shop</Link></li>
                </ul>
            </nav>
        </div>
        </>
    );
  }


  export default Navigation;