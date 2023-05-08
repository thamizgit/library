import { useState } from "react";
import "./BookLayout.css";

import { AiFillStar } from "react-icons/ai";

import { useContext } from "react";
import axios from "../api/axios";
import AuthContext from "../context/AuthContext";

import "react-toastify/dist/ReactToastify.css";
const BookLayout = ({ id, img, title, author, date, rating,setBookClick }) => {
  const { auth } = useContext(AuthContext);
  const [favLoading, setFavLoading] = useState(false);
  


  const rates = [];
  const publish = new Date(date);
  for (let i = 0; i < rating; i++) {
    rates.push(
      <span>
        <AiFillStar style={{ fontSize: "1.2rem", marginBottom: "-0.1rem" }} />
      </span>
    );
  }

  
  const handleRecent = async (id) => {
    if (auth.username) {
      try {
        setFavLoading(true);
        const result = await axios.put(
          "/books/recents",
          JSON.stringify({
            username: auth.username,
            id,
          }),
          {
            headers: {
              Accept: "application/json,text/plain",
              "Content-Type": "application/json",
            },
          }
        );
        console.log(result);
      } catch (err) {
        console.log(err);
      } finally {
        setFavLoading(false);
      }
    }
  };
  return (
    <article
      className={`book-layout ${favLoading && "mkblur"}`}
      onClick={() => handleRecent(id)}
    >
      <img
        className="book-img"
        onClick={() => setBookClick(true)}
        src={`/books/${img}`}
        alt={title}
        width={250}
        height={350}
      />

      <article
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "rem",
        }}
      >
        <p style={{ marginBottom: "-0.5rem" }}>
          <span className="book-layout-attr">
            <b>Title :</b>
          </span>
          {title}
        </p>
      </article>
      <p style={{ marginBottom: "-0.5rem" }}>
        <span className="book-layout-attr">
          <b>Author :</b>
        </span>
        {author}
      </p>
      <p style={{ marginBottom: "-0.5rem" }}>
        <span className="book-layout-attr">
          <b>Published On :</b>
        </span>
        {`${publish.getFullYear()}/${publish.getMonth()}/${publish.getDate()}`}
      </p>
      <p style={{ marginBottom: "-0.5rem", flexDirection: "row" }}>
        <span style={{ whiteSpace: "nowrap" }} className="book-layout-attr">
          <b>Rating :</b> <span style={{ color: "gold" }}>{rates}</span>
        </span>
      </p>
      
    </article>
  );
};
export default BookLayout;
