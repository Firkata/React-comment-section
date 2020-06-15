import React, { useState, useEffect, useCallback, memo } from "react";
import { db } from "../../firebaseDb";
import firebase from "firebase";

const CommentsContainer = ({ children }) => {
  const [comments, setComments] = useState([]);
  const user = firebase.auth().currentUser;

  const getComments = useCallback(() => {
    db.collection("comments")
      .get()
      .then((snapshot) => {
        let data = snapshot.docs.map((doc) => {
          let data = doc.data();
          data.id = doc.id;
          return data;
        });
        setComments(data);
      });
  }, []);

  useEffect(() => {
    getComments();
  }, [getComments]);

  const handleFetchMore = useCallback(() => {
    console.log("Todo: pagination");
  }, []);

  const handleAddComment = useCallback(
    (body) => {
      db.collection("comments")
        .doc()
        .set({
          body,
          postedAt: Date.now().toString(),
          userId: user.uid,
          userName: user.displayName,
        })
        .then(() => {
          getComments();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [user, getComments]
  );

  const handleDeleteComment = useCallback(
    (id) => {
      db.collection("comments")
        .doc(id)
        .delete()
        .then(() => {
          getComments();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    [getComments]
  );

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

export default memo(CommentsContainer);
