import * as React from 'react';

import ItemCard from '../components/itemCards/itemCards';
// import FilterRow from '../components/filterRow/filterRow';
import ItemCardFallback from "../components/itemCards/itemCardFallback";

const Dashboard = ({recipes, user, onSelect, getRecipes}) => {


    return (
      <>
            {/* <FilterRow recipes={recipes} /> */}
            {
              !recipes.length ? <ItemCardFallback  />
              : 
            <ItemCard recipes={recipes} user={user} onSelect={onSelect} getRecipes={getRecipes}  />  
            }
      </>

    )

}

export default Dashboard;
