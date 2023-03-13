import * as React from "react";

import { getAllRecipiesfromDB } from '../utils/firebase/firebase.firestore';
import { useAsync } from "../utils/lib/helperFunctions";

// as the actual value you want to access
export const RecipiesContext = React.createContext({
        recipies: null,
        setRecipies:  null,
        status: null,
        error: null,
});


export const RecipiesProvider = ({children})=>{
   
    const { status, error, run} = useAsync({ 
        status: 'idle' ,
      })
    
    const [recipies, setRecipies] = React.useState(null);

    const value = {recipies, setRecipies, status, error};
    // console.log(recipies)

    React.useEffect(()=>{
    const getAllItems = async ()=> {
            const allFromDB = await getAllRecipiesfromDB()
            setRecipies(allFromDB)
            return allFromDB;
        };
        run(getAllItems())   
        
    }, [run,])


    return <RecipiesContext.Provider value={value}>{children}</RecipiesContext.Provider>
}