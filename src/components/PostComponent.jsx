import React from "react";
import { useState, useEffect } from "react";
import CommentsComponent from "./CommentsComponent";
// import "./style.css";
import { TextField } from "@mui/material";

function PostComponent(props) {
  const [post, setPost] = useState(props.post);
  const { users } = props;
  const [showContent, setShowContent] = React.useState(false);
  const [showComments, setShowComments] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUserName] = useState([]);
  const [liked, setLiked] = useState(false);
  const [showUpdateform, setShowUpdateform] = useState(false);
  const [updatedPost, setUpdatedPost] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setUserName(users.find((username) => username.id === post.userId));
  }, [users, post.userId]);

  const ShowUsers = () => {
    if (username !== undefined) {
      return (
        <div>
          <h4>{username.username}</h4>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  };

  const Showbody = () => {
    if (showContent === true) return <p> {post.body} </p>;
  };

  const Showcomments = () => {
    if (showComments === true)
      return (
        <div>
          <CommentsComponent postid={post.id} />
        </div>
      );
  };

  const updateReactions = () => {
    if (liked === false) {
      setLiked(true);
      setPost({ ...post, reactions: post.reactions + 1 });
    } else if (liked === true) {
      setLiked(false);
      setPost({ ...post, reactions: post.reactions - 1 });
    }
  };

  const DeletePost = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://dummyjson.com/posts/${post.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
      setLoading(false);
      props.deletePost(post.id);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const UpdatePost = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://dummyjson.com/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: updatedPost.title,
          body: updatedPost.body,
        }),
      });
      const data = await response.json();
      console.log(data);
      setLoading(false);
      setShowUpdateform(false);
      setPost({ ...post, title: updatedPost.title, body: updatedPost.body });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const updateform = () => {
    if (showUpdateform) {
      return (
        <div>
          <TextField
            id="outlined-textarea"
            label="Add a title of Post"
            placeholder="Title"
            multiline
            onChange={(e) =>
              setUpdatedPost({ ...updatedPost, title: e.target.value })
            }
            style={{
              width: "100%",
              margin: "10px 0",

              borderRadius: "5px",
              padding: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              border: "1px solid #ccc",

              backgroundColor: "#fff",
              color: "#000",

              resize: "none",
            }}
          />
          <TextField
            id="outlined-textarea"
            label="Add a Post"
            placeholder="Enter Your Thoughts"
            multiline
            onChange={(e) =>
              setUpdatedPost({ ...updatedPost, body: e.target.value })
            }
            style={{
              width: "100%",
              margin: "10px 0",

              borderRadius: "5px",
              padding: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              border: "1px solid #ccc",

              backgroundColor: "#fff",
              color: "#000",

              resize: "none",
            }}
          />
          <button
            onClick={UpdatePost}
            style={{
              backgroundColor: "#ff0000",
              color: "#fff",
              borderRadius: "5px",
              padding: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              border: "1px solid #ccc",
              margin: "10px 0",

              cursor: "pointer",

              width: "100%",



            }}
          >
            Update
          </button>
        </div>
      );
    }
  };

  const ShowButtons = () => {
    if (user.id === post.userId) {
      return (
        <div>
          <button onClick={() => setShowUpdateform(!showUpdateform)}>
            Update Post
          </button>
          {updateform()}
          {"  "}
          <button onClick={DeletePost}>Delete Post</button>
        </div>
      );
    }
  };

  return (
    <div className="blog-container">
      <div className="blog-header">
        <div className="blog-author--no-cover">
          <h3> {ShowUsers()}</h3>
        </div>
      </div>
      <div className="blog-body">
        <div className="blog-title">
          <h2> {post.title} </h2>
        </div>
        <div className="blog-summary">{Showbody()}</div>
        <div className="blog-tags">
          {post.tags.map((tag) => (
            <span key={tag}>#{tag} </span>
          ))}
          <ul>
            <li>
              {" "}
              <button onClick={updateReactions}>
                {" "}
                {liked ? "Unlike" : "Like"}{" "}
              </button>
            </li>
            <li>
              <button onClick={() => setShowContent(!showContent)}>
                {showContent ? "Hide Content" : "Show Content"}
              </button>
            </li>
            <li>
              <button onClick={() => setShowComments(!showComments)}>
                {showComments ? "Hide Comments" : "Show Comments"}
              </button>
            </li>
            <li>{ShowButtons()}</li>
          </ul>
        </div>
      </div>
      <div className="blog-footer">
        <ul>
          <li className="published-date"> {post.reactions} 👍</li>
        </ul>
      </div>
      <div>{Showcomments()}</div>
    </div>
  );
}

export default PostComponent;
