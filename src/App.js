import "./App.css";
import { useState } from "react";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const PageDisplay = () => {
    if (isLoggedIn) {
      return <HomePage setIsLoggedIn={setIsLoggedIn} />;
    } else {
      return <LoginPage setIsLoggedIn={setIsLoggedIn} />;
    }
  };

  return <div>{PageDisplay()}</div>;
}

export default App;
