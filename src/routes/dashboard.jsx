import * as React from 'react';

import ItemCard from '../components/itemCard/itemCard';
import FilterRow from '../components/filterRow/filterRow';
import ItemCardFallback from "../components/itemCard/itemCardFallback";

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
