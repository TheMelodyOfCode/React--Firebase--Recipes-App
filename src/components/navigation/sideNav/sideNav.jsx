

import { Link } from 'react-router-dom'

  
  const SideNav =() => {
    return (
      <nav className="sideNav"
      >
        <h6 className="sideNav__title">Previous Selection</h6> 
        <ul className="sideNav__uoList">
            <li className="sideNav__uoList--Item">
              <Link className="sideNav__btn btn" to="/recipies">Recipies</Link>
            </li>
            <li className="sideNav__uoList--Item">
              <Link className="sideNav__btn btn" to="/recipies">Recipies</Link>
            </li>
            <li className="sideNav__uoList--Item">
              <Link className="sideNav__btn btn" to="/recipies">Recipies</Link>
            </li>
            <li className="sideNav__uoList--Item">
              <Link className="sideNav__btn btn" to="/recipies">Recipies</Link>
            </li>
        </ul>
      </nav>
    )
  }

  export default SideNav;