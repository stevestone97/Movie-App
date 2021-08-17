import React from "react";
import "./css/LogInPage.css";

export default function Registration() {
  return (
    <div className="login-wrap">
      <div className="bkc"></div>
      <div className="signup-wrap">
        <h1>Sign up</h1>
        <h4>Username</h4>
        <input className="--input" type="text" placeholder="Enter your name" />
        <h4>Email Adress</h4>
        <input className="--input" type="email" placeholder="Enter Email" />

        <h4>Password</h4>
        <input
          className="--input"
          type="password"
          placeholder="Enter password"
        />

        <h4>Re-enter password</h4>
        <input className="--input" type="password" />

        <div className="terms">
          <input type="checkbox" id="save-info" />
          <label htmlFor="save-info">
            {" "}
            I agree to the <a href="#">terms and conditions</a>
          </label>
        </div>
        <button className="submit-btn" type="submit">
          Create Account
        </button>
      </div>

      <span className="root--seperactor"></span>

      <div className="signin-wrap">
        <h1>Sign in</h1>
        <button>
          <i class="fab fa-imdb"></i> Sign in with IMDb
        </button>
        <button>
          <i class="fab fa-amazon"></i> Sign in with Amazon
        </button>
        <button>
          <i class="fab fa-facebook"></i> Sign in with Facebook
        </button>
        <button>
          <i class="fab fa-google"></i> Sign in with Google
        </button>
        <button>
          <i class="fab fa-apple"></i> Sign in with Apple
        </button>
      </div>
    </div>
  );
}
