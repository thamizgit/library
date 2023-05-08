
import {  useEffect, useState } from 'react';
import './App.css';
import Home from './components/MainPage/Home';
import axios from './api/axios';
import { Routes, Route } from "react-router-dom";
import BookContent from './components/BookContent.js/BookContent';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
function App() {
  const booklist = [];
  const [books, setBooks] = useState(booklist);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [bookClick, setBookClick] = useState(false);
  const {auth, setAuth } = useContext(AuthContext);
  
  const fetchBooks = async () => {
    try {
      setErrMsg("");
      setIsLoading(true);
      const result = await axios.post("/books/slow", JSON.stringify({ skip : "0" }), {
        headers: {
          Accept: "application/json,text/plain",
          "Content-Type":"application/json"
        }
      });
      setBooks(result.data);
    }
    catch (err) {
      if (!err?.response) setErrMsg("No server response");
      else if (err?.response?.status === 500) setErrMsg("Network Error");
      else setErrMsg("Something Went Wrong");
    }
    finally {
      setIsLoading(false);
    }
  }
  const fetchRecent = async () => {
    try {
      if (auth.username) {
        const result = await axios.get(`/books/recents/${auth.username}`);
        setRecentBooks(result.data);
      }
      else {
        return {};
      }
    } catch (err) {
      console.log(err);
    }
  };
  const [recentBooks, setRecentBooks] = useState(fetchRecent());
  useEffect(() => {
    if (sessionStorage.getItem('user') !== null) {
      const userObj = JSON.parse(sessionStorage.getItem('user'));
      setAuth(userObj);
    }
    fetchBooks();
  },[])
  return (
    <Routes>
      <Route path="/" element={
        <Home
          books={books}
          setBooks={setBooks}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          errMsg={errMsg}
          setErrMsg={setErrMsg}
          fetchBooks={fetchBooks}
          bookClick={bookClick}
          setBookClick={setBookClick}
          recentBooks={recentBooks}
        />} />
      <Route path="/bookcontent" element={<BookContent />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login isLoading={isLoading} setIsLoading={setIsLoading} />} />
    </Routes>
  );
}

export default App;
