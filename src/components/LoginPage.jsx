import React from "react";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import Button from "@mui/material/Button";

function LoginPage(props) {
  const { setIsLoggedIn } = props;
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      setLoading(false);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("isloggedin", JSON.stringify(true));
      setIsLoggedIn(true);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "white",
        }}
      >
        <TextField
          id="outlined-basic"
          label="username"
          variant="outlined"
          sx={{
            margin: "2rem 0",
          }}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="password"
          variant="outlined"
          sx={{
            margin: "2rem 0",
          }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="text"
          sx={{
            margin: "2rem 0",
          }}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Container>
    </div>
  );
}

export default LoginPage;
