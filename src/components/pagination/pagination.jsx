import * as React from 'react';
import Button from "../button/button";
import { FirestoreContext } from '../../contexts/firestore.context';

const Pagination =()=>{
    const { 
        recipes, 
        recipesPerPage,
        setRecipesPerPage,
    } = React.useContext(FirestoreContext);
   
    
    function handleRecipesPerPageChange(event) {
        const recipesPerPage = event.target.value;
        setRecipesPerPage(recipesPerPage);
      }
    
    function handleLoadMoreRecipesClick() {
    setRecipesPerPage((recipesPerPage + 3));
    }

if (recipes && recipes.length > 0) {
    return (
            <>
              <div className="pagination">
              <label className="pagination__inputLabel">
                Recipes Per Page:
                <select
                  value={recipesPerPage}
                  onChange={handleRecipesPerPageChange}
                  className="pagination__inputLabel--select"
                >
                  <option value="3">3</option>
                  <option value="6">6</option>
                  <option value="9">9</option>
                  <option value="12">12</option>
                  <option value="15">15</option>
                  <option value="25">25</option>
                </select>
              </label>
              <div className="pagination__btnBox">
                <Button
                  btnType='createUpdate'
                  onClick={handleLoadMoreRecipesClick}
                >
                  LOAD 3 MORE RECIPES
                </Button>
              </div>    
               </div>
            </>
         ) 
    } else {
        return null;
    }
         

}


export default Pagination;