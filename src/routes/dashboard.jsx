import * as React from 'react';

import ItemCard from '../components/itemCards/itemCards';
import FilterRow from '../components/filterRow/filterRow';
import Pagination from '../components/pagination/pagination';
import ItemCardFallback from "../components/itemCards/itemCardFallback";
import { FirestoreContext } from '../contexts/firestore.context';
// import HeaderCarousel from '../components/headerCarousel/headerCarousel';

const Dashboard = () => {

  const { recipes} = React.useContext(FirestoreContext);

    return (
      <>
            <FilterRow />
            {/* <HeaderCarousel /> */}
            {
              !recipes.length ? <ItemCardFallback />
              : 
            <ItemCard />  
            }
            <Pagination />
      </>

    )

}

export default Dashboard;
