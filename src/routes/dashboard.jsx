import * as React from 'react';

import ItemCard from '../components/itemCards/itemCards';
import FilterRow from '../components/filterRow/filterRow';
import ItemCardFallback from "../components/itemCards/itemCardFallback";

const Dashboard = ({recipies, user, onSelect}) => {


    return (
      <>
            <FilterRow />
            {
              !recipies.length ? <ItemCardFallback />
              :
            <ItemCard recipies={recipies} user={user} onSelect={onSelect} />  
            }
      </>

    )

}

export default Dashboard;
