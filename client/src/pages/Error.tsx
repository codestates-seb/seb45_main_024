import { Link } from "react-router-dom";

import Header from "../components/common/Header/Header";
import Footer from "../components/common/Footer";
import { ReactComponent as ErrorFace } from "../assets/icons/errorFace.svg";

import classes from "./Error.module.css";

const ErrorPage = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className={classes.errerContainer}>
          <div className={classes.errerContents}>
            <div>
              <h2 className={classes.errorTitle}>Page not found</h2>
              <p>We are sorry, we could not find the page you requested.</p>
              <Link to="/" replace className={classes.fromLeft}>
                Go back to home
              </Link>
            </div>
            <div>
              <ErrorFace width="100" height="100" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ErrorPage;
