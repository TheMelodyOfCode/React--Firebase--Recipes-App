import * as React from 'react';

import Button from "../button/button";
import {Link} from 'react-router-dom'
import { FullPageSpinner } from '../../utils/lib/lib';

const SingleItemCard = ({existingRecipe, user, onSelect}) => {

    const [name, setName] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [publishDate, setPublishDate] = React.useState(new Date().toISOString().split("T")[0]);
    const [directions, setDirections] = React.useState("");
    const [ingredients, setIngredients] = React.useState([]);
    // const [ingredientName, setIngredientName] = React.useState("");
    // const [currentRecipe, setCurrentRecipe] = React.useState(true);

    React.useEffect(() => {
        if (existingRecipe) {
          setName(existingRecipe.name);
          setCategory(existingRecipe.category);
          setDirections(existingRecipe.directions);
          setPublishDate(existingRecipe.publishDate.toISOString().split("T")[0]);
          setIngredients(existingRecipe.ingredients);
        } else {
          resetForm();
        }
      }, [existingRecipe]);

      function resetForm() {
        setName("");
        setCategory("");
        setDirections("");
        setPublishDate("");
        setIngredients([]);
      }
    //   const paragraphs = directions.replace(/\. /g, '.\n');
    //   console.log(paragraphs)
    //   React.useEffect(() => {
    //     const paragraphs = directions.replace(/\. /g, '.\n');
    //     // const paragraphs = directions.split('\n\n');
    //     // const formattedParagraphs = paragraphs.map(paragraph => paragraph.split('\n').join('\n'));
    //     // const formattedText = formattedParagraphs.join('\n\n');
    //     console.log(paragraphs)
    //     // setCurrentRecipe(paragraphs)
        
    //   }, [directions]);


    // console.log(existingRecipe.ingredients)
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


      
if (!existingRecipe) {
    return <FullPageSpinner />
} else {

        return (
            
            <div className="singleItemCard" >
                <div className="singleItemCard__container" >
                    <h1 className='singleItemCard__container__title'>{name}</h1>
                        <img className='singleItemCard__container__img'  src="img/burger1-sm.jpg" alt="burger"/>
                        <div className='singleItemCard__container__footer'>
                            <span className='singleItemCard__container__footer__publisherTitle'> 
                                Publisher:
                            </span>
                            <span className='singleItemCard__container__footer__publisherContent'> 
                            {existingRecipe.publisher}
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
                                existingRecipe.publisher === user.email ? (
                                    <div className='singleItemCard__container__footer__editBtnBox' >
                                        <Link to={`/addRecipe`}  > 
                                        {/* <Link to={`/addRecipe/${recipe.id}`}  >  */}
                                        <Button btnType='editRecipe' onClick={() => onSelect(existingRecipe.id)} >Edit</Button>
                                        {/* <Button btnType='editRecipe' onClick={() => handleEditRecipeClick(recipe.id)} >Edit</Button> */}
                                        </Link>
                                    </div>
                                ) : null
                            }
                        </div>    
                </div> 
            </div>
        );
    }
}



export default SingleItemCard;