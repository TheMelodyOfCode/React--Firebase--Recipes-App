import * as React from 'react';

import Button from "../button/button";
import { Link } from 'react-router-dom';
import { RecipiesContext } from '../../contexts/recipies.context';
// import { getFilteredDatafromDB } from '../../utils/firebase/firebase.firestore';

const ItemCard = ({ user, onSelect}) => {

    const { 
        recipies, 
        setRecipies, 
        categoryFilter, 
        setCategoryFilter, 
        orderBy, 
        setOrderBy,
        status, 
        error
    } = React.useContext(RecipiesContext);
    
    // const [orderBy, setOrderBy] = React.useState('publishDateDesc');



    React.useEffect(() => {
        if (!recipies || categoryFilter === '') {
          return
        }
        if (categoryFilter === 'reset') {
            setCategoryFilter('')
        }
 
      }, [categoryFilter, recipies, setCategoryFilter,])


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
        {/* TODO: separate filter row from itemCard */}
        <div className="filterRow">
            <label className="filterRow__recipeLabel">
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="filterRow__recipeLabel--select"
                    required
                >
                    <option value="reset">ALL Categories</option>
                    <option value="breadsSandwichesAndPizza">Breads,Sandwiches, & Pizza</option>
                    <option value="eggsAndBreakfast">Eggs & Breakfast</option>
                    <option value="saladsAnsSnacks">Salads & Snacks</option>
                    <option value="soups">Soups</option>
                    <option value="mainDish">Main Dish</option>
                    <option value="meatLovers">Meat Lover's</option>
                    <option value="fishAndSeafood">Fish & Seafood</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="dessertsAndBakedGoods">Desserts & Baked Goods</option>
                </select>
                </label>

                <div className="filterRow__addRecipeBox">
                        <a className="filterRow__addRecipeBox--link"  href='/addRecipe'>Click to Add a Recipe</a>
                </div>
                
                <label className="filterRow__dateLabel">
                <select
                    value={orderBy}
                    onChange={(e) => setOrderBy(e.target.value)}
                    className="filterRow__dateLabel--select"
                >
                    <option value="publishDateDesc">
                    Sort Date (newest - oldest)
                    </option>
                    <option value="publishDateAsc">
                    Sort Date (oldest - newest)
                    </option>
                </select>
            </label>
      </div>

      <div className="itemCard" >
            {
            recipies.map((recipe) => { 
                if ( recipe.publisher !== user.email && recipe.isPublished === false ) {
                    return null
                } else {

                return (
                    
                    <div className="itemCard__container" key={recipe.id}>
                        <>

                        { recipe.publisher === user.email && recipe.isPublished === false ? (
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
                                    recipe.publisher === user.email ? (
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