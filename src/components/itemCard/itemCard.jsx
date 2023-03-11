import Button from "../button/button";
import * as React from 'react';
const ItemCard = ({allFromDB, user}) => {



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
            allFromDB.map((recipe) => { 
                if (recipe.publisher === user.email) {
                return (
                    <div className="itemCard__container" key={recipe.id}>
                        
                        { recipe.isPublished === false ? (
                                <h1 className="itemCard__container__unpublished">UNPUBLISHED</h1>
                            ) :  <h1 className='itemCard__container__title'>{recipe.name}</h1>
                        }
                       
                            <img className='itemCard__container__img'  src="img/burger1-sm.jpg" alt="burger"/>
                            <div className='itemCard__container__footer'>
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
                                    user ? (
                                        <div className='itemCard__container__footer__editBtnBox' >
                                                <Button btnType='editRecipe' >Edit</Button>
                                        </div>
                                    ) : null
                                }
                            </div>    
                    </div> 
                    ) } else {
                        return null;
                    }   
                
                
                })
            }
        </div>
    );
}



export default ItemCard;