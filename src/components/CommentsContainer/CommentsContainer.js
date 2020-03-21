import React, { useState, useEffect } from "react";
import { db } from "../../firebaseDb";
import firebase from "firebase";

const CommentsContainer = ({ children }) => {
  const [comments, setComments] = useState([]);
  const user = firebase.auth().currentUser;

  useEffect(() => {
    getComments();
  }, []);

  const getComments = () => {
    db.collection("comments")
      .get()
      .then(snapshot => {
        let data = snapshot.docs.map(doc => {
          let data = doc.data();
          data.id = doc.id;
          return data;
        });
        setComments(data);
      });
  };

  const handleAddComment = body => {
    db.collection("comments")
      .doc()
      .set({
        body,
        postedAt: Date.now().toString(),
        userId: user.uid,
        userName: user.displayName
      })
      .then(() => {
        console.log("Added comment");
        getComments();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return <>{children(comments, handleAddComment)}</>;
};

export default CommentsContainer;
