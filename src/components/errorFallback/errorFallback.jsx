


const ErrorFallback = ({error, resetErrorBoundary,}) => {
    
    return (
        <section  className="cardItemError">
            <div role="alert" className="cardItemError__card">
                <img className="cardItemError__card__img" src='img/sadError.png'  alt='error' />
                <h1 className="cardItemError__card__title">There was an error: {''}</h1>
                <p className="cardItemError__card__text">
                    {error.message}
                </p> 
                {/* <button className="cardItemError__errorBtn" onClick={resetErrorBoundary}>Try again</button>  */}
            </div>
        </section>
    )
  }

  export default ErrorFallback;