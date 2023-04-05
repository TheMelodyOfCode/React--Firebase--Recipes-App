import * as React from 'react';

import ItemCard from '../components/itemCards/itemCards';
import FilterRow from '../components/filterRow/filterRow';
import Pagination from '../components/pagination/pagination';

// TODO: check where cardItemFallback is needed

const Dashboard = () => {

  // const { recipes} = React.useContext(FirestoreContext);

    return (
      <>
        <FilterRow />
          <ItemCard /> 
        <Pagination />
      </>
    )

}

export default Dashboard;
