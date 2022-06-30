import React from "react";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AddPostComponent from "./AddPostComponent";
import LoadingComponent from "./LoadingComponent";
import PostComponent from "./PostComponent";

function FeedComponent() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [errorUsers, setErrorUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(10);
  const [max, setMax] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      setErrorUsers(null);
      try {
        const response = await fetch(`https://dummyjson.com/users?limit=100`);
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        setErrorUsers(error);
      }
      setLoadingUsers(false);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://dummyjson.com/posts?limit=10`);
        const data = await response.json();
        setPosts(data.posts);
        setMax(data.total);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const fetchMorePosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://dummyjson.com/posts?limit=10&skip=${offset}`
      );
      const data = await response.json();
      console.log(data);
      setPosts([...posts, ...data.posts]);
      setOffset(offset + 10);
      setHasMore(offset < max);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  console.log(posts);
  const deletePost = async (id) => {
    const newPosts = posts.filter((post) => post.id !== id);
    setPosts(newPosts);
  };

  const AddNewPost = async (post) => {
    const newPosts = [post, ...posts];
    setPosts(newPosts);
  };

  return (
    <div>
      <AddPostComponent AddNewPost={AddNewPost} />
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMorePosts}
        hasMore={hasMore}
        loader={
          <h4>
            <LoadingComponent />
          </h4>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {posts.map((post) => (
          <PostComponent
            post={post}
            key={post.id}
            users={users}
            loadingUsers={loadingUsers}
            errorUsers={errorUsers}
            deletePost={deletePost}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default FeedComponent;
