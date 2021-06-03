import "./App.css";
import React, { useState, useCallback } from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import Dashboard from "../src/components/dashboard/Dashboard";
import Signup from "../src/components/signup/Signup";
import Login from "../src/components/login/Login";
import ResetPasswordComponent from "../src/components/reset-password-description/ResetPasswordDescription";
import SetupPasswordComponent from "../src/components/reset-password/ResetPassword";
import ForgotPasswordComponent from "../src/components/forgot-password/ForgotPassword";
import EmailVerification from "../src/components/email-verification/EmailVerification";
import AuthenticationOfEmail from "../src/components/email-authentication/EmailAuthentication";
import ErrorComponent from "../src/components/error/Error";
import EmailVerifiedComponent from "../src/components/email-verified/EmailVerified";

function App() {
  return (
    <Route>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/email-verification">
          <EmailVerification />
        </Route>
        <Route exact path="/email-verified">
          <EmailVerifiedComponent />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPasswordComponent />
        </Route>
        <Route exact path="/reset-password">
          <SetupPasswordComponent />
        </Route>
        <Route exact path="/resend-reset-password">
          <ResetPasswordComponent />
        </Route>
        <Route exact path="/email-authentication">
          <AuthenticationOfEmail />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route component={ErrorComponent} />
      </Switch>
    </Route>
  );
}

export default App;
