import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "tabler-react";
import styles from "./AddCommentForm.module.css";

const AddCommentForm = ({ onSubmit }) => {
  const [body, setBody] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    if (body === "") {
      return;
    }

    onSubmit(body);
    setBody("");
  };

  return (
    <form onSubmit={event => handleSubmit(event)}>
      <textarea
        className={styles.Textarea}
        onChange={event => setBody(event.target.value)}
        value={body}
        maxLength={100}
      />
      <Button
        className={styles.SubmitButton}
        color="success"
        disabled={body === ""}
        type="submit"
      >
        Send
      </Button>
    </form>
  );
};

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default AddCommentForm;
