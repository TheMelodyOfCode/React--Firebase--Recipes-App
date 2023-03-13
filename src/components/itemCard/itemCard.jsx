import * as React from 'react';

import Button from "../button/button";
import { Link } from 'react-router-dom';

const ItemCard = ({recipies, user, onSelect}) => {


    // const [currentRecipeID, setCurrentRecipeID] = React.useState(null);
    // const [recipe, setRecipe] = React.useState(null);


    // console.log(currentRecipe)
    // React.useEffect(() => {
    //     if (!recipies) {
    //       return
    //     }
    //     if(currentRecipeID) {
    //     const recipe = recipies.find(recipe => recipe.id === currentRecipeID)
    //     // setRecipe(recipe)
    //     console.log(recipe)
    //     }
    //   }, [currentRecipeID, recipies])


//   function handleEditRecipeClick (recipeID) {
//         setCurrentRecipeID(recipeID)
//     }



    // TODO: move to database instead of hardcoding
    function lookupCategoryLabel(categoryKey) {
        const categories = {
          breadsSandwichesAndPizza: 'Breads, Sandwiches, and Pizza',
          eggsAndBreakfast: 'Eggs & Breakfast',
          saladsAnsSnacks: 'Salads & Snacks',
          soups: 'soups'  ,
          mainDish: 'Main Dish',
          meatLovers: 'Meat Lover\'s',
          fishAndSeafood: 'Fish & Seafood',
          vegetables: 'Vegetables',
          dessertsAndBakedGoods: 'Desserts & Baked Goods',
        };
    
        const label = categories[categoryKey];
    
        return label;
      }
      


    return (
        
        <div className="itemCard" >
            {
            recipies.map((recipe) => { 
                // if (recipe.publisher === user.email) {
                return (
                    <div className="itemCard__container" key={recipe.id}>
                        { recipe.publisher === user.email && recipe.isPublished === false ? (
                                <h1 className="itemCard__container__unpublished">UNPUBLISHED</h1>
                            ) :  <h1 className='itemCard__container__title'>{recipe.name}</h1>
                        }
                       
                            <img className='itemCard__container__img'  src="img/burger1-sm.jpg" alt="burger"/>
                            <div className='itemCard__container__footer'>
                                <span className='itemCard__container__footer__publisherTitle'> 
                                    Publisher:
                                </span>
                                <span className='itemCard__container__footer__publisherContent'> 
                                {recipe.publisher}
                                </span>
                                <span className='itemCard__container__footer__categoryTitle'> 
                                    Category:
                                </span>
                                <span className='itemCard__container__footer__categoryContent'> 
                                    {lookupCategoryLabel(recipe.category)}
                                </span>
                                <span className='itemCard__container__footer__dateTitle'>
                                    Publish Date:
                                </span>
                                <span className='itemCard__container__footer__dateContent'>
                                    {recipe.publishDate.toLocaleString("de-DE", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                </span>
                                {
                                    recipe.publisher === user.email ? (
                                        <div className='itemCard__container__footer__editBtnBox' >
                                            <Link to={`/addRecipe`}  > 
                                            {/* <Link to={`/addRecipe/${recipe.id}`}  >  */}
                                            <Button btnType='editRecipe' onClick={() => onSelect(recipe.id)} >Edit</Button>
                                            {/* <Button btnType='editRecipe' onClick={() => handleEditRecipeClick(recipe.id)} >Edit</Button> */}
                                            </Link>
                                        </div>
                                    ) : null
                                }
                            </div>    
                    </div> 
                    ) 
                // } else {
                //         return null;
                //     }   
                
                
                })
            }
        </div>
    );
}



export default ItemCard;