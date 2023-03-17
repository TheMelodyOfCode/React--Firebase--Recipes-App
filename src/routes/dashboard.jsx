import * as React from 'react';

import ItemCard from '../components/itemCards/itemCards';
// import FilterRow from '../components/filterRow/filterRow';
import ItemCardFallback from "../components/itemCards/itemCardFallback";

const Dashboard = ({recipies, user, onSelect, getRecipies}) => {


    return (
      <>
            {/* <FilterRow recipies={recipies} /> */}
            {
              !recipies.length ? <ItemCardFallback  />
              : 
            <ItemCard recipies={recipies} user={user} onSelect={onSelect} getRecipies={getRecipies}  />  
            }
      </>

    )

}

export default Dashboard;
