

const ItemCardFallback = () => {

    return (
            <div className="itemCardFallback" >
                <div className="itemCardFallback__container" > 
                    <h1 className="itemCardFallback__container__title">No recipes available</h1>
                    <h2 className="itemCardFallback__container__subTitle">or no connection</h2>
                    <img className='itemCardFallback__container__img'  src="img/noConnection.png" alt="error"/>
                    <div className='itemCardFallback__container__footer'>
                        <span className='itemCardFallback__container__footer__categoryTitle'> 
                            Cause: 
                        </span>
                        <span className='itemCardFallback__container__footer__categoryContent'> 
                            No recipes with that category available <br/> or no connection
                        </span>
                        <span className='itemCardFallback__container__footer__linkBox'>
                            <a className='itemCardFallback__container__footer__linkBox--link'  href='/'>Go Back</a>
                        </span>
                    </div>    
                </div>    
            </div>
        ) 
    
}

export default ItemCardFallback;