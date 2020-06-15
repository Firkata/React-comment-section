import React, { useCallback, useMemo, memo } from "react";
import firebase from "firebase";
import { Grid, Button } from "tabler-react";
import styles from "./AccountWidget.module.css";

const AccountWidget = () => {
  const signOut = useCallback(() => firebase.auth().signOut(), []);
  const getName = useMemo(() => firebase.auth().currentUser.displayName, []);
  const getPhoto = useMemo(() => firebase.auth().currentUser.photoURL, []);

  return (
    <Grid.Row className="mt-4 mr-4 mb-5 d-flex justify-content-end align-items-center">
      <img
        alt="profile_pic"
        className={styles.ProfileImage}
        src={getPhoto}
        height="50"
        width="50"
      />
      <h4 className="mt-3 mx-4">{getName}</h4>
      <Button className={styles.SignOutButton} onClick={signOut}>
        Sign out
      </Button>
    </Grid.Row>
  );
};

export default memo(AccountWidget);
