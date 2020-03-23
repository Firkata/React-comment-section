import React from "react";
import firebase from "firebase";
import { Grid, Button } from "tabler-react";
import styles from "./AccountWidget.module.css";

const AccountWidget = () => {
  return (
    <Grid.Row className="mt-4 mr-4 mb-5 d-flex justify-content-end align-items-center">
      <img
        alt="profile_pic"
        className={styles.ProfileImage}
        src={firebase.auth().currentUser.photoURL}
        height="50"
        width="50"
      />
      <h4 className="mt-3 mx-4">{firebase.auth().currentUser.displayName}</h4>
      <Button
        className={styles.SignOutButton}
        onClick={() => firebase.auth().signOut()}
      >
        Sign out
      </Button>
    </Grid.Row>
  );
};

export default AccountWidget;
