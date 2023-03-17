import * as React from "react";

import { getAllRecipiesfromDB, getFilteredDatafromDB, getDataOrderedByfromDB} from '../utils/firebase/firebase.firestore';
import { useAsync } from "../utils/lib/helperFunctions";

// as the actual value you want to access
export const RecipiesContext = React.createContext({
        recipies: null,
        setRecipies:  null,
        categoryFilter: null,
        setCategoryFilter: null,
        setOrderBy: null,
        orderBy: null,
        status: null,
        error: null,
});


export const RecipiesProvider = ({children})=>{
   
    const { status, error, run} = useAsync({ 
        status: 'idle' ,
      })
    
    const [recipies, setRecipies] = React.useState(null);
    const [categoryFilter, setCategoryFilter] = React.useState('');
    const [orderBy, setOrderBy] = React.useState('publishDateDesc');

    const value = {recipies, setRecipies, categoryFilter,orderBy, setOrderBy, setCategoryFilter, status, error}

    React.useEffect(()=>{
        if (categoryFilter === '') {
        const getAllItems = async ()=> {
            const allFromDB = await getAllRecipiesfromDB()
            setRecipies(allFromDB)
            return allFromDB;
        };
        run(getAllItems())   

        if (orderBy) {
            const getSortedRecipies = async ()=> {
                const orderByField = 'publishDate';
                let orderByDirection;
                console.log(orderBy)
                    if(orderBy) {
                        switch (orderBy) {
                            case 'publishDateAsc':
                                orderByDirection = 'asc'
                                break;
                            case 'publishDateDesc':
                                orderByDirection = 'desc'
                                break;
                            default:
                                break;
                    }
        
            const filteredItemsFromDB = await getDataOrderedByfromDB(
                        {
                            orderByField: orderByField,
                            orderByDirection: orderByDirection,
                        }
                        )
                    // console.log(filteredItemsFromDB)
                    setRecipies(filteredItemsFromDB)
                    return filteredItemsFromDB;
                    }       
            }
            run(getSortedRecipies())
        }

    } else {

    const getFilteredRecipies = async ()=> {

            const filteredItemsFromDB = await getFilteredDatafromDB('category', categoryFilter)
            setRecipies(filteredItemsFromDB)
            return filteredItemsFromDB;
            } 
            run(getFilteredRecipies())
    }


    }, [categoryFilter, orderBy, run])

    return <RecipiesContext.Provider value={value}>{children}</RecipiesContext.Provider>
}