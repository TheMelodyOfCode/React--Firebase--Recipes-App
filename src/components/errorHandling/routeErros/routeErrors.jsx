import { useRouteError, Link } from "react-router-dom";
import BgVideo from "../../bg-video/bg-video.component";

const RouteErrors = () => {

/** Inside of an errorElement, this hooks returns anything thrown during an action, loader, 
 *  or rendering. Note that thrown responses have special treatment, 
 *  see isRouteErrorResponse for more information. */
  const error = useRouteError();
  console.error(error);

  return (
    <section className="errorPage">
            <BgVideo videoSrc='space'/>
            <h5 className="errorPage__heading">
            Ooops,.....
            </h5>

            <img className="errorPage__img"  src="img/error.png" alt="Ooops error Button" />

            <div className="errorPage__text">
                <p>Error Message:.</p>
                <p> {error.statusText || error.message} </p>
            </div>

            <div className="errorPage__linkBox">
                <Link to="/" className="errorPage__linkBox__link" >Go back home &rarr;</Link>
            </div>
    </section>
  );
}

export default RouteErrors;