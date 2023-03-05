


const ItemCard = ({recipies}) => {

    const {name, category, publishDate} = recipies;

return (
    <div className="itemCard" >
        <div className="itemCard__container">
        <h1 className='itemCard__container__title'>{name}</h1>
        <img className='itemCard__container__img'  src="img/burger1-sm.jpg" alt="burger"/>
            <div className='itemCard__container__footer'>
                <span className='itemCard__container__footer__categoryTitle'> 
                    Category:
                </span>
                <span className='itemCard__container__footer__categoryContent'> 
                    {category}
                </span>
                <span className='itemCard__container__footer__dateTitle'>
                    Publish Date:
                </span>
                <span className='itemCard__container__footer__dateContent'>
                    {publishDate}
                </span>
            </div>   
        </div>
    </div>
);

}

export default ItemCard;