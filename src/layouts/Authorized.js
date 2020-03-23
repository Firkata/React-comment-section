import React, { useEffect } from "react";
import AccountWidget from "../components/AccountWidget";
import { db } from "../firebaseDb";
import firebase from "firebase";
import { Grid } from "tabler-react";
import Conversation from "../components/Conversation/Conversation";
import AddCommentForm from "../components/Conversation/AddCommentForm";
import CommentsList from "../components/Conversation/CommentsList";
import CommentsContainer from "../components/CommentsContainer";

const Authorized = () => {
  const user = firebase.auth().currentUser;
  const userRef = db.collection("users").doc(user.uid);

  useEffect(() => {
    userRef.get().then(docSnapshot => {
      if (!docSnapshot.exists) {
        userRef.set({
          name: user.displayName
        });
      }
    });
  });

  return (
    <div>
      <AccountWidget />
      <CommentsContainer>
        {(comments, handleFetchMore, handleAddComment, handleDeleteComment) => (
          <Grid.Col className="offset-3 col-6">
            <Conversation>
              <AddCommentForm onSubmit={handleAddComment} />
              <CommentsList
                comments={comments}
                onFetchMore={handleFetchMore}
                onDeleteComment={handleDeleteComment}
              />
            </Conversation>
          </Grid.Col>
        )}
      </CommentsContainer>
    </div>
  );
};

export default Authorized;
