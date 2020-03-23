import React from "react";
import PropTypes from "prop-types";
import TimeAgo from "react-timeago";
import styles from "./Comment.module.css";

const Comment = ({ comment: { id, body, postedAt, userName }, onDelete }) => {
  const intDate = parseInt(postedAt);
  const date = new Date(intDate).toUTCString();

  return (
    <div className={styles.Comment}>
      <span className={styles.Username}>
        {userName}
        <span className={styles.Time}>
          <TimeAgo date={date} />
          <img
            alt="Delete"
            className={styles.Bin}
            onClick={() => {
              onDelete(id);
            }}
            src="/bin.png"
          />
        </span>
      </span>
      <p className={styles.CommentBody}>{body}</p>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    body: PropTypes.string.isRequired,
    postedAt: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired
  }).isRequired
};

export default Comment;
