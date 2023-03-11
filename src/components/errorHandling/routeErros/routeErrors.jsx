import { Link } from "react-router-dom";


const RouteErrors = () => {



  return (
    <section className="errorPage">

            <img className="errorPage__img"  src="img/error-404.png" alt="Ooops error Button" />

            <div className="errorPage__linkBox">
                <Link to="/" className="errorPage__linkBox__link" >Go back home &rarr;</Link>
            </div>
    </section>
  );
}

export default RouteErrors;