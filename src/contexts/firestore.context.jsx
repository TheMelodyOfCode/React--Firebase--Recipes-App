import * as React from "react";

import { 
    getAllDatafromDB, 
    getSingleDocfromDB,
    getFilteredDatafromDB, 
    paginateDataFromDB
} from '../utils/firebase/firebase.firestore';
import { useAsync } from "../utils/lib/helperFunctions";

// as the actual value you want to access
export const FirestoreContext = React.createContext({
        recipes: null,
        setRecipes:  null,
        categoryFilter: null,
        setCategoryFilter: null,
        setOrderBy: null,
        orderBy: null,
        recipesPerPage: null,
        setRecipesPerPage: null,
        currentRecipeID: null,
        setCurrentRecipeID: null,
        singleRecipe: null,
        setSingleRecipe: null,
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
    const [recipesPerPage, setRecipesPerPage] = React.useState(3);
    const [currentRecipeID, setCurrentRecipeID] = React.useState(null);
    const [singleRecipe, setSingleRecipe] = React.useState(null);
    
    const getAllRecipesFromDB = async ()=> {

      try {
          const allFromDB = await getAllDatafromDB()
          setRecipes(allFromDB)
          return allFromDB;
          } catch (error) 
          {
            console.error(error.message);
            throw error;
          }
    }

    const value = {getAllRecipesFromDB, recipes, setRecipes,recipesPerPage, setRecipesPerPage,singleRecipe, setSingleRecipe, currentRecipeID, setCurrentRecipeID, categoryFilter,orderBy, setOrderBy, setCategoryFilter, status, error}
    



    React.useEffect(() => {
        if (!recipes) {
          return
        }
        if(currentRecipeID) {
            const getSingleRecipes = async ()=> {
      
              try {
                  const allFromDB = await getSingleDocfromDB(currentRecipeID)
                  setSingleRecipe(allFromDB)
                  } catch (error) 
                  {
                    console.error(error.message);
                    throw error;
                  }
            }
            run(getSingleRecipes())
        }

      }, [currentRecipeID, recipes, run, setRecipes])


    React.useEffect(()=>{
        if (categoryFilter === '') {

        if (orderBy) {
            const getSortedRecipes = async ()=> {
                const orderByField = 'publishDate';
                let orderByDirection;
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

                    const postsFromDB = await paginateDataFromDB(
                                {
                                    pageSize:recipesPerPage,
                                    orderByField: orderByField,
                                    orderByDirection: orderByDirection,
                                }
                        )
                        .then((
                        {posts, newLastVisible }  
                        ) => {
                        return posts;
                    });

                    setRecipes(postsFromDB)
                    return postsFromDB;

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


    }, [categoryFilter, orderBy, recipesPerPage, run])

    return <FirestoreContext.Provider value={value}>{children}</FirestoreContext.Provider>
}