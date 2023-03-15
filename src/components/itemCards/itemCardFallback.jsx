

const ItemCardFallback = () => {

    return (
            <div className="itemCardFallback" >
                <div className="itemCardFallback__container" > 
                    <h1 className="itemCardFallback__container__unpublished">No Connection</h1>
                    <img className='itemCardFallback__container__img'  src="img/noConnection.png" alt="error"/>
                    <div className='itemCardFallback__container__footer'>
                        <span className='itemCardFallback__container__footer__categoryTitle'> 
                            Category: 
                        </span>
                        <span className='itemCardFallback__container__footer__categoryContent'> 
                                No Connection
                        </span>
                        <span className='itemCardFallback__container__footer__dateTitle'>
                            Publish Date: 
                        </span>
                        <span className='itemCardFallback__container__footer__dateContent'>
                            No Connection
                        </span>
                    </div>    
                </div>    
            </div>
        ) 
    
}

export default ItemCardFallback;