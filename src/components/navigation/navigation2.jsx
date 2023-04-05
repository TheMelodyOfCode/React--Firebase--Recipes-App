import * as React from 'react';
import { Link } from "react-router-dom";


// import { 
//     FoodIcon, 
//     // SettingsIcon, 
//     LogoutIcon, 
//     // ContactIcon,
//     AddIcon,
//     TextIcon } from '../../utils/lib/lib';



const Navigation2 = ({user}) => {
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
          <Link to="#">Home</Link>
        </li>
        <li>
          <Link to="#">About</Link>
        </li>
        <li>
          <Link to="#">Services</Link>
        </li>
        <li>
          <Link to="#">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation2;
