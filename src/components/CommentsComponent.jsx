import React from "react";
import { useState, useEffect } from "react";
import "./comments.css";

function CommentsComponent(props) {
  const { postid } = props;
  const [comments, setComments] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://dummyjson.com/posts/${postid}/comments`
        );
        const data = await response.json();
        setComments(data.comments);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchComments();
  }, [postid]);

  return (
    <div>
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            <b>{comment.user.username}</b>
            <p>{comment.body}</p>
          </div>
        );
      })}
    </div>
  );
}

export default CommentsComponent;
