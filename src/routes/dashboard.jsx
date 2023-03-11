import * as React from 'react';
import {  getAllRecipiesfromDB } from '../utils/firebase/firebase.firestore';

import { useAsync } from '../utils/lib/helperFunctions';
import { UserContext } from '../contexts/user.context';

// import GenerateText from '../components/generateText/generateText';
import ItemCard from '../components/itemCard/itemCard';
import FilterRow from '../components/filterRow/filterRow';
import { FullPageSpinner } from '../utils/lib/lib';

const Dashboard = () => {

  const { currentUser, setCurrentUser} = React.useContext(UserContext);

  const {data: allFromDB, status, error, run} = useAsync({ 
    status: 'idle' ,
  })


    React.useEffect(()=>{
      const getAllItems = async ()=> {
        const allFromDB = await getAllRecipiesfromDB()
        return allFromDB;
    };
    run(getAllItems())
        
    }, [ currentUser, run,])


switch (status) {
  case 'idle':
    return <FullPageSpinner />
    // return <span>No Connection - Connect to Internet</span>
  case 'pending':
    return <FullPageSpinner />
  case 'rejected':
    throw error
  case 'resolved':
    return (
      <>
            <FilterRow />
            <ItemCard allFromDB={allFromDB} user={currentUser}/>  
      </>

    )
  default:
    throw new Error('This should be impossible')
}


}

export default Dashboard;
