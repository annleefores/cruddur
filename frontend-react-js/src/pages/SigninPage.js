import './SigninPage.css';
import React from "react";
import { ReactComponent as Logo } from '../components/svg/logo.svg';
import { Link } from "react-router-dom";
import FormErrors from 'components/FormErrors';

import { Auth } from 'aws-amplify';

export default function SigninPage() {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState("");

  const onsubmit = async (event) => {
    setErrors("");
    event.preventDefault();

    Auth.signIn(email, password)
      .then((user) => {
        // console.log("user",user)
        localStorage.setItem(
          "access_token",
          user.signInUserSession.accessToken.jwtToken
        );
        window.location.href = "/";
      })
      .catch((error) => {
        console.log("Error!", error);
        if (error.code === "UserNotConfirmedException") {
          window.location.href = "/confirm";
        }
        setErrors(error.message);
      });

    return false;
  };

  const email_onchange = (event) => {
    setEmail(event.target.value);
  };
  const password_onchange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <article className="signin-article">
      <div className="signin-info">
        <Logo className="logo" />
      </div>
      <div className="signin-wrapper">
        <form className="signin_form" onSubmit={onsubmit}>
          <h2>Sign into your Cruddur account</h2>
          <div className="fields">
            <div className="field text_field username">
              <label>Email</label>
              <input type="text" value={email} onChange={email_onchange} />
            </div>
            <div className="field text_field password">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={password_onchange}
              />
            </div>
          </div>
          <FormErrors errors={errors} />
          <div className="submit">
            <Link to="/forgot" className="forgot-link">
              Forgot Password?
            </Link>
            <button type="submit">Sign In</button>
          </div>
        </form>

        <div className="center-a-div">
          <div
            className="google-btn"
            onClick={() => Auth.federatedSignIn({ provider: 'Google' })}>

            <div className="google-icon-wrapper">
              <img
                alt="google logo"
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <div className="dont-have-an-account">
          <span>Don't have an account?</span>
          <Link to="/signup">Sign up!</Link>
        </div>
      </div>
    </article>
  );
}
