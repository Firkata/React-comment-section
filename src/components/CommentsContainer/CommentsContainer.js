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

  const handleFetchMore = () => {
    console.log("Todo: pagination");
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
        getComments();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDeleteComment = id => {
    db.collection("comments")
      .doc(id)
      .delete()
      .then(() => {
        getComments();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <>
      {children(
        comments,
        handleFetchMore,
        handleAddComment,
        handleDeleteComment
      )}
    </>
  );
};

export default CommentsContainer;
