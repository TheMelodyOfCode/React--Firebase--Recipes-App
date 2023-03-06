


const ItemCard = ({allFromDB}) => {


return (
    
    <div className="itemCard" >
        {
        allFromDB.map((recipie) => { 
            return (
                <div className="itemCard__container" key={recipie.id}>
                    <h1 className='itemCard__container__title'>{recipie.name}</h1>
                        <img className='itemCard__container__img'  src="img/burger1-sm.jpg" alt="burger"/>
                        <div className='itemCard__container__footer'>
                            <span className='itemCard__container__footer__categoryTitle'> 
                                Category:
                            </span>
                            <span className='itemCard__container__footer__categoryContent'> 
                                {recipie.category}
                            </span>
                            <span className='itemCard__container__footer__dateTitle'>
                                Publish Date:
                            </span>
                            <span className='itemCard__container__footer__dateContent'>
                                {recipie.publishDate.toLocaleString("de-DE", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                            </span>
                        </div>    
                </div>
                )})
        }
    </div>
);

}

export default ItemCard;