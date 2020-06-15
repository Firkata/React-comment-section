import React, { memo } from "react";
import PropTypes from "prop-types";
import Comment from "../Comment";
import styles from "./CommentsList.module.css";

const handleScroll = ({ currentTarget }, onFetchMore) => {
  if (
    currentTarget.scrollTop + currentTarget.clientHeight >=
    currentTarget.scrollHeight
  ) {
    onFetchMore();
  }
};

const CommentsList = ({ comments, onFetchMore, onDeleteComment }) => {
  if (comments.length === 0) {
    return <p className="text-center text-muted">{"No comments added yet"}</p>;
  }

  comments.sort((a, b) => {
    return a.postedAt < b.postedAt ? 1 : -1;
  });

  return (
    <div
      className={styles.Container}
      onScroll={(event) => handleScroll(event, onFetchMore)}
    >
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onDelete={onDeleteComment}
        />
      ))}
    </div>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  onFetchMore: PropTypes.func.isRequired,
};

export default memo(CommentsList);
