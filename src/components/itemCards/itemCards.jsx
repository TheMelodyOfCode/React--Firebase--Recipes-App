import * as React from 'react';

import Button from "../button/button";
import { Link } from 'react-router-dom';
import { FirestoreContext } from '../../contexts/firestore.context';
import { UserContext } from '../../contexts/user.context';

const ItemCard = () => {

    const { currentUser, } = React.useContext(UserContext);
    const { 
        recipes, 
        setCurrentRecipeID,
    } = React.useContext(FirestoreContext);
   
    
    function onSelect(recipeID) {
        setCurrentRecipeID(recipeID);
    }


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
    <>
      <div className="itemCard" >
            {
            recipes.map((recipe) => { 
                if ( recipe.publisher !== currentUser.email && recipe.isPublished === false ) {
                    return null
                } else {

                return (
                    
                    <div className="itemCard__container" key={recipe.id}>
                        <>

                        { recipe.publisher === currentUser.email && recipe.isPublished === false ? (
                                <h1 className="itemCard__container__unpublished">UNPUBLISHED</h1>
                            ) :  <h1 className='itemCard__container__title'>{recipe.name}</h1>
                        }
                       
                            <Link  to={`/recipe`}  > 
                                <div className='itemCard__container__imgBtnBox' >
                                <img className='itemCard__container__imgBtnBox--img'  src="img/burger1-sm.jpg" alt="burger"/>
                                    <Button btnType='viewRecipe' onClick={() => onSelect(recipe.id)} >
                                        View
                                    </Button>
                                </div>
                            </Link>
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
                                    recipe.publisher === currentUser.email ? (
                                        <div className='itemCard__container__footer__editBtnBox' >
                                            <Link to={`/addRecipe`}  > 
                                                <Button btnType='editRecipe' onClick={() => onSelect(recipe.id)} >
                                                    Edit
                                                </Button>
                                            </Link>
                                        </div>
                                    ) : null
                                }
                            </div>    
                            
                    </>
                    </div> 
                    ) 
                } 
             } )
            }
        </div> 
    </>
    )
}



export default ItemCard;