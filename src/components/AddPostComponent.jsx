import React from "react";
import { TextField } from "@mui/material";
import "./style.css";

function AddPostComponent(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [post, setPost] = React.useState({
    title: "",
    body: "",
    userId: user.id,
    reactions: 0,
    tags: [],
  });
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const AddPost = async (post) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: post.title,
          userId: 5,
          body: post.body,
        }),
      });
      const data = await response.json();
      console.log(data);
      setLoading(false);
      props.AddNewPost(post);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  const AddpostHandler = (e) => {
    e.preventDefault();
    AddPost(post);
    props.AddNewPost(post);
  };

  return (
    <div className="blog-container">
      <div className="blog-body">
        <TextField
          id="outlined-textarea"
          label="Add a title of Post"
          placeholder="Title"
          multiline
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          sx={{
            width: "100%",
            margin: "10px 0",
            borderRadius: "5px",
            border: "1px solid #ccc",
            padding: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#333",
            "&:focus": {
              outline: "none",
              border: "1px solid #ccc",
              boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
            },
          }}
        />
        <TextField
          id="outlined-textarea"
          label="Add a Post"
          placeholder="Enter Your Thoughts"
          multiline
          onChange={(e) => setPost({ ...post, body: e.target.value })}
          sx={{
            width: "100%",
            margin: "10px 0",
            borderRadius: "5px",
            border: "1px solid #ccc",
            padding: "10px",
            fontSize: "16px",
            color: "#333",
            "&:focus": {
              outline: "none",
              border: "1px solid #ccc",
              boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
            },
          }}
        />
        <div className="blog-tags">
          <ul>
            <li>
              <button onClick={AddpostHandler} style={{
                backgroundColor: "#00bcd4",
                margin: "10px 0",
                color: "#fff",
                borderRadius: "5px",
                padding: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#00acc1",
                },
              }}>Add Post</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AddPostComponent;
