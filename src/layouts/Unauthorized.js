import React from "react";
import firebase from "firebase";
import { StyledFirebaseAuth } from "react-firebaseui";

const Unauthorized = () => {
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false
    }
  };

  return (
    <header className="App-header">
      <h2>Firas Al-Husari ( React comment section )</h2>
      <p>Please Sign in leave comments</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </header>
  );
};

export default Unauthorized;
