import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Authorized from "./layouts/Authorized";
import Unauthorized from "./layouts/Unauthorized";
import "./App.css";
import "tabler-react/dist/Tabler.css";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
  });

  return (
    <div className="App">
      {isSignedIn && <Authorized />}
      {!isSignedIn && <Unauthorized />}
    </div>
  );
};

export default App;
