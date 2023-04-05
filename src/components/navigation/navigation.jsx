import * as React from 'react';
import { Link } from "react-router-dom";


import { 
    FoodIcon, 
    // SettingsIcon, 
    LogoutIcon, 
    // ContactIcon,
    AddIcon,
    TextIcon } from '../../utils/lib/lib';



const Navigation = ({user, logout}) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navigation">

    <div className="logoBox">
        <Link to='/' className='logoBox--link'>
            <h1 className='logoBox--logo'>Recipes</h1>
        </Link>    
    </div>

    <p className="userEmail" >{user.email}</p>

      <div className={`menu ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li>
        <p className="mainNav__userEmail" >{user.email}</p>
        </li>
        <li>
          <Link  onClick={() => {window.location.href="/"}}><FoodIcon />{' '} Home</Link>
        </li>
        <li>
          <Link onClick={() => {window.location.href="/addRecipe"}} ><AddIcon/>{' '} Add Recipe</Link>
        </li>
        <li>
          <Link onClick={() => {window.location.href="/generateText"}}><TextIcon/>{' '} Generate Name</Link>
        </li>
        <li>
          <Link onClick={logout} ><LogoutIcon/>{' '} SIGN OUT</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
