import * as React from 'react';


// import MainNav from '../components/navigation/mainNav/mainNav'
import ItemCard from '../components/itemCard/itemCard';
// import GenerateText from '../components/generateText/generateText';
import FilterRow from '../components/filterRow/filterRow';

import { createDocument, getAllRecipiesfromDB } from '../utils/firebase/firebase.firestore';


import { useAsync } from '../utils/lib/helperFunctions';
import { FullPageSpinner } from '../utils/lib/lib';
import { UserContext } from '../contexts/user.context';

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
            {/* <MainNav user={currentUser} logout={logout} /> */}
            <FilterRow />
            <ItemCard allFromDB={allFromDB} user={currentUser}/>  
            {/* <AddEditRecipeForm handleAddRecipe={handleAddRecipe}/>  */}
      </>

    )
  default:
    throw new Error('This should be impossible')
}


}

export default Dashboard;
