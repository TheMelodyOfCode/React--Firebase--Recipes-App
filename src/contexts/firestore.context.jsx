import * as React from "react";

import { getAllRecipesfromDB, getFilteredDatafromDB, getDataOrderedByfromDB} from '../utils/firebase/firebase.firestore';
import { useAsync } from "../utils/lib/helperFunctions";

// as the actual value you want to access
export const FirestoreContext = React.createContext({
        recipes: null,
        setRecipes:  null,
        categoryFilter: null,
        setCategoryFilter: null,
        setOrderBy: null,
        orderBy: null,
        status: null,
        error: null,
});


export const FirestoreProvider = ({children})=>{
   
    const { status, error, run} = useAsync({ 
        status: 'idle' ,
      })
    
    const [recipes, setRecipes] = React.useState(null);
    const [categoryFilter, setCategoryFilter] = React.useState('');
    const [orderBy, setOrderBy] = React.useState('publishDateDesc');

    const value = {recipes, setRecipes, categoryFilter,orderBy, setOrderBy, setCategoryFilter, status, error}

    React.useEffect(()=>{
        if (categoryFilter === '') {
        const getAllItems = async ()=> {
            const allFromDB = await getAllRecipesfromDB()
            setRecipes(allFromDB)
            return allFromDB;
        };
        run(getAllItems())   

        if (orderBy) {
            const getSortedRecipes = async ()=> {
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
                    setRecipes(filteredItemsFromDB)
                    return filteredItemsFromDB;
                    }       
            }
            run(getSortedRecipes())
        }

    } else {

    const getFilteredRecipes = async ()=> {

            const filteredItemsFromDB = await getFilteredDatafromDB('category', categoryFilter)
            setRecipes(filteredItemsFromDB)
            return filteredItemsFromDB;
            } 
            run(getFilteredRecipes())
    }


    }, [categoryFilter, orderBy, run])

    return <FirestoreContext.Provider value={value}>{children}</FirestoreContext.Provider>
}