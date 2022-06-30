import React from "react";
import FeedComponent from "./FeedComponent";

function HomePage(props) {
  const { setIsLoggedIn } = props;

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };

  return (
    <div>
      <button onClick={handleLogout} style={{
        backgroundColor: "#ff0000",
        color: "#fff",
        borderRadius: "5px",
        padding: "10px",
        fontSize: "16px",
        fontWeight: "bold",
        margin: "10px 0",
      }}>
      Logout</button>
      <FeedComponent />
    </div>
  );
}

export default HomePage;
