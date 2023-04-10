import * as React from 'react';

import { FirestoreContext } from '../../contexts/firestore.context';
import {Link} from 'react-router-dom'
import { FullPageSpinner } from '../../utils/lib/lib';
import Tooltip from '../tooltip/tooltip';
import { UserContext } from '../../contexts/user.context';
import Button from "../button/button";
import ItemCardFallback from './itemCardFallback';


const SingleItemCard = () => {

    const { currentUser, } = React.useContext(UserContext);

    const [name, setName] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [publishDate, setPublishDate] = React.useState(new Date().toISOString().split("T")[0]);
    const [directions, setDirections] = React.useState("");
    const [ingredients, setIngredients] = React.useState([]);
    const [singleRecipestate, setSingleRecipeState] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState("");

    const { 
        singleRecipe, 
        setCurrentRecipeID,
        currentRecipeID,
        status, 
        error
    } = React.useContext(FirestoreContext);

    function onSelect(recipeID) {
        setCurrentRecipeID(recipeID)
    }


    
    React.useEffect(() => {
        if (singleRecipe) {
        setSingleRecipeState(true)
        const formatDate = new Date(singleRecipe.publishDate.seconds * 1000)
          setName(singleRecipe.name);
          setCategory(singleRecipe.category);
          setDirections(singleRecipe.directions);
          setPublishDate(formatDate);
          setIngredients(singleRecipe.ingredients);
          setImageUrl(singleRecipe.imageUrl);
        } else {
          resetForm();
        }
      }, [singleRecipe]);

      function resetForm() {
        setName("");
        setCategory("");
        setDirections("");
        setPublishDate("");
        setIngredients([]);
        setSingleRecipeState(false)
      }

    // // TODO: move to database instead of hardcoding
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

    
if (singleRecipestate === false) {
    return <ItemCardFallback />
} else {
    switch (status) {
      case 'pending':
        return <FullPageSpinner />
      case 'rejected':
        throw error
      case 'resolved':
        return (
            
            <div className="singleItemCard" >
                <Link className="singleItemCard__goBackLink"  to='/'> &larr; Go Back</Link>
                <div className="singleItemCard__container" >
                    <h1 className='singleItemCard__container__title'>{name}</h1>
                        <Link className='singleItemCard__container__img' to='/' >
                            <Tooltip content='click to go Back'>
                            <img   src={imageUrl} alt="burger"/>
                            </Tooltip>
                        </Link>
                        <div className='singleItemCard__container__footer'>
                            <span className='singleItemCard__container__footer__publisherTitle'> 
                                Publisher:
                            </span>
                            <span className='singleItemCard__container__footer__publisherContent'> 
                            {singleRecipe.publisher}
                            </span>
                            <span className='singleItemCard__container__footer__categoryTitle'> 
                                Category:
                            </span>
                            <span className='singleItemCard__container__footer__categoryContent'> 
                                {lookupCategoryLabel(category)}
                            </span>
                            <span className='singleItemCard__container__footer__directionsTitle'> 
                                Directions:
                            </span>
                            <span className='singleItemCard__container__footer__directionsContent'> 
                            {
                                    directions.split("\n\n").map((item, index) => {
                                        return <div key={index}> <p>{item.replace(/\. /g, '.\n')}</p></div>
                                    }
                                    )
                            }
                            </span>
                            <span className='singleItemCard__container__footer__ingredientsTitle'> 
                                Ingredients:
                            </span>
                            <span className='singleItemCard__container__footer__ingredientsContent'> 
                                {
                        
                                    ingredients.map((item, index) => {
                                        return <div key={index}> <p>{item.replace(/\. /g, '.\n')}</p></div>
                                        // return <ul><li key={index}>{item}</li></ul>
                                    }
                                    )
                                    
                                    
                                }
                            </span>

                            <span className='singleItemCard__container__footer__dateTitle'>
                                Publish Date:
                            </span>
                            <span className='singleItemCard__container__footer__dateContent'>
                                {publishDate.toLocaleString("de-DE", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                            </span>
                            {
                                singleRecipe.publisher === currentUser.email ? (
                                    <div className='singleItemCard__container__footer__editBtnBox' >
                                        <Link to={`/addRecipe`}  > 
                                        <Button btnType='editRecipe' onClick={() => onSelect(currentRecipeID)} >Edit</Button>
                                        </Link>
                                    </div>
                                ) : null
                            }
                        </div>    
                </div> 
            </div>
        )
        default:
            throw new Error('This should be impossible')
          }
        }
    }
    




export default SingleItemCard;