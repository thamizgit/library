import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Register.css";
import axios from '../../api/axios';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillInfoCircleFill } from "react-icons/bs";
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#%&*]).{8,24}$/;
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [matchPass, setMatchPass] = useState("");

  const [userFocus, setUserFocus] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const userMatch = USER_REGEX.test(username);
  const pwdMatch = password.match(PWD_REGEX);
  const validMatch = password === matchPass;

  const [infoMsg, setInfoMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [registerLoading, setRegisterLoading] = useState(false);
  useEffect(() => {
    setErrMsg("");
    if (userMatch) {
      setInfoMsg("");
    }
    if (userFocus && !userMatch) {
      setInfoMsg(
        "Username should start with a letter and contain 4-23 characters"
      );
    } else {
      setInfoMsg("");
    }
  }, [userFocus, username]);

  useEffect(() => {
    setErrMsg("");
    if (pwdMatch) {
      setInfoMsg("");
    }
    if (pwdFocus && !pwdMatch) {
      setInfoMsg(
        "Password should contain 8-24 character in which there should be atleast one special character, a digit and a lower-case letter"
      );
    } else {
      setInfoMsg("");
    }
  }, [pwdFocus, password]);
  useEffect(() => {
    setErrMsg("");
    if (validMatch) {
      setInfoMsg("");
    }
    if (matchFocus && !validMatch) {
      setInfoMsg("Password should match");
    } else {
      setInfoMsg("");
    }
  }, [matchFocus, matchPass]);

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!userMatch || !pwdMatch || !validMatch) {
          setInfoMsg("Enter Valid Details :(");
          return;
    }
    try {
      setRegisterLoading(true);
      const result = await axios.post("/register", JSON.stringify({
        username, password
      }), {
        headers: {
          Accept: "application/json,text/plain",
          "Content-Type": "application/json"
        }
      });
      console.log(result);
      setInfoMsg("Registration Success ! You can login now with your account")
    }
    catch (err) {
      if (!err?.response)
        setErrMsg("No server response");
      else if (err.response?.status === 409)
        setErrMsg("Username already taken");
      else
        setErrMsg("Something went wrong");
    }
    finally {
      setRegisterLoading(false);
    }
  };
  return (
    <section className="register-container">
      <Header />
      <section className="register">
        {infoMsg && <p className="info-msg">{<BsFillInfoCircleFill style={{margin:"auto 0.5rem"}}/>}{infoMsg}</p>}
        {errMsg && <p className="err-msg">{errMsg}</p>}
        <h1>REGISTER {registerLoading && <p className="spin-1"></p>}</h1>
        <form className="register-form">
          <label htmlFor="username">Username:</label>
          <input
            className={`${userMatch && "match"}`}
            type="text"
            id="username"
            required
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />

          <label htmlFor="password">Password:</label>
          <input
            className={`${pwdMatch && "match"}`}
            type="password"
            id="password"
            required
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />

          <label htmlFor="re-password">Re-Enter Password:</label>
          <input
            className={`${validMatch && "match"}`}
            type="password"
            id="re-password"
            required
            autoComplete="off"
            value={matchPass}
            onChange={(e) => setMatchPass(e.target.value)}
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />

          <button type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
        </form>
        <span style={{ alignSelf: "center" }}>
          Already a member?{" "}
          <Link style={{ color: "white" }} to="/login">
            Login
          </Link>
        </span>
      </section>
      <Footer />
    </section>
  );
};
export default Register;
