import React, { useEffect, memo, useMemo } from "react";
import AccountWidget from "../components/AccountWidget";
import { db } from "../firebaseDb";
import firebase from "firebase";
import { Grid } from "tabler-react";
import {
  Conversation,
  AddCommentForm,
  CommentsList,
} from "../components/Conversation";
import CommentsContainer from "../components/CommentsContainer";

const Authorized = () => {
  const user = useMemo(() => firebase.auth().currentUser, []);
  const userRef = useMemo(() => db.collection("users").doc(user.uid), [
    user.uid,
  ]);

  useEffect(() => {
    userRef.get().then((docSnapshot) => {
      if (!docSnapshot.exists) {
        userRef.set({
          name: user.displayName,
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

export default memo(Authorized);
