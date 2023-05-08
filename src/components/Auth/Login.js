import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Register.css";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "../../api/axios";
import { useState } from "react";

import { Link,useNavigate } from "react-router-dom";
const Login = ({isLoading,setIsLoading}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    if (!username || !password)
    {
      setErrMsg("Missing details");
      return;
      }
    e.preventDefault();
    try {
      setIsLoading(true);
      const result = await axios.post("/login", JSON.stringify({
        username, password
      }), {
        headers: {
          Accept: "application/json,text/plain",
          "Content-Type": "application/json"
        }
      });
      const name = result.data.username;
      const recents = result.data.recents;
      const favourites = result.data.favourites;
      const userObj = {
        username: name,
        recents,
        favourites
      };
      setAuth(userObj);
      sessionStorage.setItem('user', JSON.stringify(userObj));
      setUsername('');
      setPassword('');
      navigate('/');
      
    } catch (err) {
      if (!err.response)
        setErrMsg("Check your connection")
      else if (err.response?.status === 401)
        setErrMsg("Incorrect username or password")
      else
        setErrMsg("Check your connection")
    }
    finally {
      setIsLoading(false);
    }
  
  };
  return (
    <section className="register-container">
      <Header />
      <section className="register">
        {!isLoading && errMsg && <p className="err-msg">{errMsg}</p>}
        <h1>LOGIN {isLoading && <p className="spin-1"></p>}</h1>
        <form className="register-form">
          <label htmlFor="username">Username:</label>
          <input className="match"
            type="text"
            id="username"
            required
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input className="match"
            type="password"
            id="password"
            required
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" onClick={(e) => handleSubmit(e)}>
            Submit
          </button>
        </form>
        <span style={{ alignSelf: "center" }}>
          Need an Account?{" "}
          <Link style={{ color: "white" }} to="/register">
            Register
          </Link>
        </span>
      </section>
      <Footer />
    </section>
  );
};
export default Login;
